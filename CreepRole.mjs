//funckja przydziela funckje creep w zalenosci od ich cial
//atakujacy atakuje, leczacy leczy

import { getObjectsByPrototype, findInRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn } from '/game/prototypes';
import { ATTACK, ERR_NOT_IN_RANGE, RANGED_ATTACK, HEAL } from 'game/constants';
import { CreepCount } from './CreepCount.mjs';

export function CreepRole() {
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var enemyCreep = getObjectsByPrototype(Creep).filter(creep => !creep.my);
    var enemySpawn = getObjectsByPrototype(StructureSpawn).find(s => !s.my);
    var myAttackCreeps = myCreeps.filter(i => i.body.some(bodyPart => bodyPart.type == ATTACK));
    //var enemyHeal = enemyCreep.filter(i => i.body.some(bodyPart => bodyPart.type == HEAL));

    for (var creep of myCreeps) {
        let targetsInRange = findInRange(creep, enemyCreep, 10);
        if (creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
            if (myAttackCreeps.length >= 3) {
                if (targetsInRange.length >= 1) {
                    //ataokwoanie creepa najblizszego poprzez droge
                    let closeEnemyCreep = findClosestByPath(creep, enemyCreep);
                    console.log('Wykryto wroga!');
                    // console.log(closeEnemyCreep);
                    if (creep.attack(closeEnemyCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closeEnemyCreep);
                    }
                }
                if (creep.attack(enemySpawn) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemySpawn);
                    //console.log('ide_do_spawnu_chuju');
                }
            }
        }
        //dystansowiec
        if (creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
            if (myAttackCreeps.length >= 3) {
                if (targetsInRange.length >= 1) {
                    //ataokwoanie creepa najblizszego poprzez droge
                    let closeEnemyCreep = findClosestByPath(creep, enemyCreep);
                    console.log('Wykryto wroga!');
                    //wyszukiwanie leakrza w zasiegu
                    if (creep.rangedAttack(closeEnemyCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closeEnemyCreep);
                    }
                }
                else {
                    if (creep.rangedAttack(enemySpawn) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemySpawn);
                        //console.log('ide_do_spawnu_chuju');
                    }
                }
            }
        }
        if (creep.body.some(bodyPart => bodyPart.type == HEAL)) {
            var myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
            let CloseMyAttackCreep = findClosestByPath(creep, myAttackCreeps);
            if (myDamagedCreeps.length > 0) {
                for (var crepo of myDamagedCreeps) {
                    let CloseDamaged = findClosestByPath(creep, crepo);
                    if (creep.rangedHeal(CloseDamaged) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(CloseDamaged);
                    }
                }
            }
            else {
                let enemyInRange = findInRange(creep, enemyCreep, 5);
                if (enemyInRange.length > 0) creep.moveTo(CloseMyAttackCreep);
                creep.moveTo(enemySpawn);
            }
        }
    }
}