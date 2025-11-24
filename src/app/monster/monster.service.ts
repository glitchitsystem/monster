import { Monster } from './monster.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import monstersData from '../../assets/monsters.json';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';

@Injectable()
export class MonsterService {
    monstersChanged = new Subject<Monster[]>()
    // json:any = monsterData
    private monsterData = monstersData


    private monsters: Monster[] = [
        new Monster('Vampire',
            'He just wants your blood.',
            true,
            'soldier'),

        new Monster('Swamp Creature',
            'He awaits you in the swamp.',
            false,
            'medic')
    ];

    constructor(private dialog: MatDialog, private dialogService: DialogService) { }

    getMonsters() {
        return this.monsters.slice()
    }

    getMonster(index: number) {
        return this.monsters[index]
    }
    
    addMonster(monster: Monster) {
        this.monsters.push(monster)
        this.monstersChanged.next(this.monsters.slice())
    }

    updateMonster(index: number, newMonster: Monster) {
        this.monsters[index] = newMonster
        this.monstersChanged.next(this.monsters.slice())
    }

    deleteMonster(index: number) {
        this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
            if (res) {
                this.monsters.splice(index, 1)
                this.monstersChanged.next(this.monsters.slice())
            }
        })
    }

    favoriteMonster(index: number, newMonster: Monster) {
        this.monsters[index] = newMonster
        this.monstersChanged.next(this.monsters.slice())
    }

    addRandomMonster() {
        let unique = false
        let r = Math.floor(Math.random() * 4)
        var monster = new Monster(this.monsterData[r].name, this.monsterData[r].desc, false, this.monsterData[r].role)
        // Need to figure this one out
        // while (!unique) {
        //     var monster = new Monster(monsterData[r].name, monsterData[r].desc, false)
        //     console.log("This is monster: " + monster.name)
        //     for (let i = 0; i < this.monsters.length; i++) {
        //         console.log("This is monsters: " + this.monsters[i].name)
        //         if (this.monsters[i].name.toUpperCase() === monster.name.toUpperCase()) {

        //         } else {
        //             unique = true
        //             this.monsters.push(monster)
        //             break
        //         }
        //     }
        // }

        this.monsters.push(monster)
        this.monstersChanged.next(this.monsters.slice())
    }

    removeAll() {
        this.monsters = []
        this.monstersChanged.next(this.monsters.slice())
    }

    createRandomTeam() {
        // First clear the list
        this.monsters = []
        this.monstersChanged.next(this.monsters.slice())

        // Now create the monsters
        for (let i = 0; i < 5; i++) {
            let r = Math.floor(Math.random() * this.monsterData.length)
            let monster = new Monster(this.monsterData[r].name, this.monsterData[r].desc, false, this.monsterData[r].role)

            this.monsters.push(monster)
        }

        this.monstersChanged.next(this.monsters.slice())
    }

    unfavoriteAll() {
        for (let i = 0; i < this.monsters.length; i++) {
            this.monsters[i].favorite = false
        }

        this.monstersChanged.next(this.monsters.slice())
    }

    sortMonsters() {
        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        this.monsters.sort(dynamicSort("name"))
        this.monstersChanged.next(this.monsters.slice())
    }
}