//funckja, ktora tworzy jednego co bije i jednego leczącego
//funckja przyjmuje jako wartości:
//liczbe od kotrej ma zaczac towrzyc wojownikow
//liczbe przy ktorej ma stowrzyc jednego lekarza
//liczbe creepow znajdujacych sie na planszy 

import { getObjectsByPrototype } from '/game/utils';
import { StructureSpawn, Creep } from '/game/prototypes';
import { ATTACK, HEAL, MOVE, RANGED_ATTACK, TOUGH } from 'game/constants';

export function war(Begin, Medic, CreepCount) {
    var mySpawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var myAttackCreeps = myCreeps.filter(i => i.body.some(bodyPart => bodyPart.type == ATTACK));

    if (CreepCount >= Begin) {
        //console.log(myAttackCreeps.length);
        if (CreepCount % Medic == 0 && myAttackCreeps.length > 0) { //jesli liczba sojuszniczych creepow na planszy wynosi 2, spawnuj creepa leczacego
            mySpawn.spawnCreep([HEAL, HEAL, MOVE]).object;
        }
        else {
            if (CreepCount % 2 == 0 && myAttackCreeps.length > 0) mySpawn.spawnCreep([MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK]);
            else mySpawn.spawnCreep([TOUGH, MOVE, ATTACK, ATTACK, MOVE]).object;
        }
    }
}