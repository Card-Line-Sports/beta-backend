export class Avatar {
    jerseyNum: number;
    jerseyColor: Array<number>;
    team: string;
    skinTone: Array<number>;
    height: number;
    hairColor: Array<number>;
 
    constructor(jerseyNum: number, jerseyColor: Array<number>, team: string, skinTone: Array<number>, height: number, hairColor: Array<number>) {
            this.jerseyNum = jerseyNum;
            this.jerseyColor = jerseyColor;
            this.team = team;
            this.skinTone = skinTone;
            this.height = height;
            this.hairColor = hairColor;
        }

    getJerseyNum() {
        return this.jerseyNum;
    }

    setJerseyColor(red: number, green: number, blue: number): void {
        this.jerseyColor = [red, green, blue];
    }

    getJerseyColor() {
        return this.jerseyColor;
    }

    getTeam() {
        return this.team;
    }

    setSkinTone(red: number, green: number, blue: number): void {
        this.skinTone = [red, green, blue];
    }

    getSkinTone() {
        return this.skinTone;
    }

    getHeight() {
        return this.height;
    }

    setHairColor(red: number, green: number, blue: number): void {
        this.hairColor = [red, green, blue];
    }

    getHairColor() {
        return this.hairColor;
    }

}