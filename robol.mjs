// funkcja spawnuje jednego robotnika ktory WYDOBYWA energie i trasportuje do spwana

import {CARRY, ERR_NOT_IN_RANGE, MOVE, RESOURCE_ENERGY, WORK } from 'game/constants';
import { Creep, Source, StructureSpawn, } from '/game/prototypes';
import { getObjectsByPrototype } from '/game/utils';

export function robol() {
    var creep = getObjectsByPrototype(Creep).filter(i => i.my);
    const source = getObjectsByPrototype(Source); //zmiena na źródło energi
    // spawnoanie creepow
    var mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    //console.log(!creep[0]);
    for (let a = 0; a < 1; a++) {
        //jak masz duzo to dostarczasz do bazy energie
        var myFullCreeps = creep.find(i => i.store.getUsedCapacity(RESOURCE_ENERGY) > 20); //jesli robotnik ma 20 energi zanosi ja do bazy
        if (creep.find(i => i.store.getUsedCapacity(RESOURCE_ENERGY) > 20)) {
            if (myFullCreeps.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                myFullCreeps.moveTo(mySpawn);
               // console.log('warunek spelniony');
            }
            else myFullCreeps.transfer(mySpawn, RESOURCE_ENERGY);
        }

        if (!creep[a]) {
            creep[a] = mySpawn.spawnCreep([MOVE, WORK, CARRY]).object; //spawnuje 1 creepy
        }
        else {
            // zbieranie energi
            if (creep[a].harvest(source[0]) == ERR_NOT_IN_RANGE) {
                creep[a].moveTo(source[0]);
            }
            else creep[a].harvest(source[0]);
        }
    }
}