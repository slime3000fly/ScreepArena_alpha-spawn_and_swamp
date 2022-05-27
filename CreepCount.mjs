//funckja liczaca ile jest crrepow twoch na planszy, makasymalna liczba creepow jaka moze zliczyc to a

import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';

var a = 1000;

export function CreepCount() {
    var creep = getObjectsByPrototype(Creep).filter(i => i.my);
    var CreepCount = 0;
    for (let i = a; i >= 0; i--) {
        if (!creep[i]) CreepCount = 0;
        else {
            CreepCount = i + 1;
            if (CreepCount == a) a++;
            break;
        }
    }
    return CreepCount;
}