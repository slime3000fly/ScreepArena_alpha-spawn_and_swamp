// funkcja spawnuje jednego robotnika ktory pobiera energie z konetenera i trasportuje do spwana
//jako zmienne przyjmuje ilosc creepow ktore maja pracowac przy zbieraniu energi \

import { CARRY, ERR_NOT_IN_RANGE, MOVE, RESOURCE_ENERGY, WORK, ERR_NOT_ENOUGH_RESOURCES } from 'game/constants';
import { Creep, StructureSpawn, StructureContainer, StructureTower, ConstructionSite } from '/game/prototypes';
import { getObjectsByPrototype, findClosestByPath, createConstructionSite } from '/game/utils';
import { CreepCount } from './CreepCount.mjs';

export function work_container(WorkCreep) {
    var creep = getObjectsByPrototype(Creep).filter(i => i.my);
    var container = getObjectsByPrototype(StructureContainer).filter(i => i.store.getUsedCapacity(RESOURCE_ENERGY) > 20);
    // spawnoanie creepow
    var mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    let source = findClosestByPath(mySpawn, container);
    var myWorkCreep = creep.filter(i => i.body.some(bodyPart => bodyPart.type == CARRY));
    var constructionSite = getObjectsByPrototype(ConstructionSite).filter(i => i.my);

    const y = mySpawn.y + 1;
    const x = mySpawn.x + 1;

    var CrCo = CreepCount();

    if (mySpawn.store[RESOURCE_ENERGY] >= 500) if (constructionSite.length == 0) createConstructionSite({ x, y }, StructureTower);

    for (let a = 0; a < WorkCreep; a++) {
        if (!creep[a]) {
            if (CrCo == WorkCreep - 1) creep[a] = mySpawn.spawnCreep([MOVE, MOVE, WORK, CARRY]).object; //spawnuje 1 creepy mogacego budowac
            else creep[a] = mySpawn.spawnCreep([MOVE, MOVE, CARRY, CARRY]).object; //spawnuje 1 creepy
        }
        else {
            if (constructionSite.length > 0) {
            }
            if (creep[a].body.some(bodyPart => bodyPart.type == WORK)) {
                if (creep[a].build(constructionSite) == ERR_NOT_ENOUGH_RESOURCES) {
                    console.log('no jest');
                    if (creep[a].withdraw(mySpawn) == ERR_NOT_IN_RANGE) creep[a].moveTo(mySpawn);
                    console.log('buduje');
                }
                else {
                    if (creep[a].build(constructionSite) == ERR_NOT_IN_RANGE) creep[a].moveTo(constructionSite);
                }
            }
            else {
                for (var cr of myWorkCreep) {
                    {
                        if (cr.store[RESOURCE_ENERGY] > 20) {
                            if (cr.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) cr.moveTo(mySpawn);
                        }
                        if (cr.store[RESOURCE_ENERGY] <= 20)
                        //zbieranie energi
                        {
                            if (cr.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                cr.moveTo(source);
                            }
                            else cr.withdraw(source, RESOURCE_ENERGY);
                        }
                    }
                }
            }
        }
    }
}