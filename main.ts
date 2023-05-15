//  RECEPTION informations
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (PARTIE == 1) {
        if (name == "VIRAGE") {
            VIRAGE = 0
        }
        
        if (name == "VITESSE") {
            VITESSE += value * 10
        }
        
    }
    
    if (PARTIE == 3) {
        if (name == "Dé") {
            Dé = value
        }
        
    }
    
})
let _case = 0
let Dé = 0
let VIRAGE = 0
let PARTIE = 0
radio.setGroup(74)
let VITESSE = 0
PARTIE = 1
//  PARTIE 1
basic.forever(function on_forever() {
    
    if (PARTIE == 1) {
        if (VIRAGE == -1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 123)
        }
        
        if (VIRAGE == 2) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 123)
        }
        
        if (VIRAGE == 0) {
            if (DFRobotMaqueenPlus.ultraSonic(PIN.P1, PIN.P2) < 10) {
                VITESSE = 0
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, VITESSE)
            } else {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, VITESSE)
            }
            
        }
        
    }
    
})
//  PARTIE 2
basic.forever(function on_forever2() {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    }
    
})
//  PARTIE 3
basic.forever(function on_forever3() {
    
    if (PARTIE == 3) {
        while (_case < Dé) {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                _case += 1
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 128)
            }
            
        }
        VIRAGE = 0
        Dé = 0
        maqueen.motorStop(maqueen.Motors.All)
    }
    
})
basic.forever(function on_forever4() {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        radio.sendValue("PARTIE", 2)
    }
    
})
basic.forever(function on_forever5() {
    while (_case < Dé) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    }
})
basic.forever(function on_forever6() {
    
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1 && PARTIE == 2) {
        PARTIE = 3
    }
    
})
