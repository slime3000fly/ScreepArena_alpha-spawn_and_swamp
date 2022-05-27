import { robol } from './robol.mjs';
import { CreepCount } from './CreepCount.mjs';
import { CreepRole } from './CreepRole.mjs';
import { war } from './war.mjs';
import { work_container } from './work_container.mjs';


var liczba = 3;

export function loop() {
    work_container(liczba);
    war(liczba,3,CreepCount());
    CreepRole();
}
