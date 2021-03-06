class Game {

    constructor() {
        this.score = 0;
        this.state = 'start_menu';
        this.mineral = 250;
        this.currentLevel = 0;
        this.currentDistance = 0;
        this.maxDistance = 60;
        this.currentOxygen = 60;
        this.maxOxygen = 60;
        this.currentHealth = 50;
        this.maxHealth = 50;
        this.difficultySetting = 0;
    }

    addScore(addScore) {
        this.score += addScore;
    }

    addOxygen(oxygen) {
        this.currentOxygen += oxygen;
        if (this.currentOxygen > this.maxOxygen) {
            this.currentOxygen = this.maxOxygen;
        }
    }
    addHealth(health) {
        this.currentHealth += health;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }
    addMaxOxygen(oxygen) {
        this.maxOxygen += oxygen;
        this.currentOxygen += oxygen;
 
    }
    addMaxHealth(health) {
        this.maxHealth += health;
        this.currentHealth += health;

    }    
    getObstacleReward(obstacle) {
        if (obstacle.lootType == 'oxygen') {
            this.currentOxygen += obstacle.lootAmount;
            if (this.currentOxygen > this.maxOxygen) {
                this.currentOxygen = this.maxOxygen;
            }
        }
        if (obstacle.lootType == 'mineral') {
            this.mineral += obstacle.lootAmount;
        }
    }
    getMineral() {
        return this.mineral;
    }
    getHealthArray() {
        return [this.currentHealth, this.maxHealth];
    }

    addDistance(distance) {
        this.currentDistance += distance;
    }

    completeLevel() {
        if (this.currentDistance > this.maxDistance) {
            return true;
        }
        return false;
    }

    getOxygenArray() {
        return [this.currentOxygen, this.maxOxygen];
    }
    getDistanceArray() {
        return [this.currentDistance, this.maxDistance];
    }
    over() {
        if (this.currentOxygen <= 0) {
            return true;
        }
        if (this.currentHealth <= 0) {
            return true;
        }
        return false;
    }

    removeOxygen(oxygenToRemove) {
        this.currentOxygen -= oxygenToRemove;
    }
    resetGame() {
        this.score = 0;
        this.maxOxygen = 60;
        this.currentOxygen = 60;
        this.mineral = 250;
        this.currentLevel = 0;
        this.currentDistance = 0;
        this.maxDistance = 60;
        this.currentHealth = 50;
        this.maxHealth = 50;
    }

    setLevel(difficultySetting) {
        this.currentLevel += 1;
        this.currentDistance = 0;
        
        this.difficultySetting = difficultySetting

        //this.maxDistance = 60;
    }

    getDifficulty(){
        // Medium
        if(this.difficultySetting == 1){
            return 4;
        }
        // Hard
        if(this.difficultySetting == 2){
            return 6;
        }
        // Easy
        return 2;
    }
    
    update() {

        Background.renderGamePanels();

        Background.render();


        requests.map(request => request.render());

        goals.map(goal => goal.render());

        textInterface.renderInfoPanel();

    }

    checkShipAndSolarFlare(ship, solarflare) {
        if (solarflare.spawnLeft && ship.position_x < 64) {
            this.currentHealth -= 5;

        }
    }
}