# RECEPTION informations

def on_received_value(name, value):
    global VIRAGE, VITESSE, Dé
    if PARTIE == 1:
        if name == "VIRAGE":
            VIRAGE = 0
        if name == "VITESSE":
            VITESSE += value * 10
    if PARTIE == 3:
        if name == "Dé":
            Dé = value
radio.on_received_value(on_received_value)

_case = 0
Dé = 0
VIRAGE = 0
PARTIE = 0
radio.set_group(74)
VITESSE = 0
PARTIE = 1
# PARTIE 1

def on_forever():
    global VITESSE
    if PARTIE == 1:
        if VIRAGE == -1:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 123)
        if VIRAGE == 2:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 123)
        if VIRAGE == 0:
            if DFRobotMaqueenPlus.ultra_sonic(PIN.P1, PIN.P2) < 10:
                VITESSE = 0
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, VITESSE)
            else:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, VITESSE)
basic.forever(on_forever)

# PARTIE 2

def on_forever2():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)
basic.forever(on_forever2)

# PARTIE 3

def on_forever3():
    global _case, VIRAGE, Dé
    if PARTIE == 3:
        while _case < Dé:
            if maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
                _case += 1
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 128)
        VIRAGE = 0
        Dé = 0
        maqueen.motor_stop(maqueen.Motors.ALL)
basic.forever(on_forever3)

def on_forever4():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        radio.send_value("PARTIE", 2)
basic.forever(on_forever4)

def on_forever5():
    while _case < Dé:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 80)
basic.forever(on_forever5)

def on_forever6():
    global PARTIE
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1 and PARTIE == 2:
        PARTIE = 3
basic.forever(on_forever6)
