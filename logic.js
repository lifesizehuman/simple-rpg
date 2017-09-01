var inquirer = require("inquirer");

// Put this into its own file later!
var modifiers = {
  Warrior: {
    hp: 100,
    mana: 10,
    offense: 30,
    defense: 80,
    speed: 80,
    luck: 50,
    intelligence: 10
  },
  Mage: {
    hp: 100,
    mana: 10,
    offense: 30,
    defense: 80,
    speed: 80,
    luck: 50,
    intelligence: 10
  },
  Healer: {
    hp: 100,
    mana: 10,
    offense: 30,
    defense: 80,
    speed: 80,
    luck: 50,
    intelligence: 10
  },
  Berserker: {
    hp: 100,
    mana: 10,
    offense: 30,
    defense: 80,
    speed: 80,
    luck: 50,
    intelligence: 10
  },
  Warpriest: {
    hp: 100,
    mana: 10,
    offense: 30,
    defense: 80,
    speed: 80,
    luck: 50,
    intelligence: 10
  }
};

function Character(name, type) {
  var alive = "Alive";
  var dead = "Dead";

  this.name = name;
  this.type = type;
  this.level = 1;
  this.hp = this.level * modifiers[this.type].hp;
  this.mana = this.level * modifiers[this.type].mana;
  this.offense = this.level * modifiers[this.type].offense;
  this.defense = this.level * modifiers[this.type].defense;
  this.speed = this.level * modifiers[this.type].speed;
  this.intelligence = this.level * modifiers[this.type].intelligence;
  this.status = function() {
    if (this.hp > 0) {
      console.log("Status: " + alive);
    } else {
      console.log("Status: " + dead);
    }
  };
  this.printStats = function() {
    console.log("Name: " + this.name);
    console.log("Class: " + this.type);
    console.log("Health: " + this.hp);
    console.log("Mana: " + this.mana);
    console.log("Offense: " + this.offense);
    console.log("Defense: " + this.defense);
    console.log("Speed: " + this.speed);
    console.log("Luck: " + this.luck);
    console.log("Intellect: " + this.intelligence);
    this.status();
    console.log("---------------------");
  };
  this.attack = function(target) {
    var damage = ((this.offense * this.luck) - (target.defense * target.luck));
    target.hp -= damage;
    console.log(this.name + " attacked " + target.name);
    console.log("Damage inflicted: " + damage);
    console.log(this.name + "'s health: " + this.hp);
    console.log(target.name + "'s health: " + target.hp);
  };
  this.heal = function(target) {
    if (this.type === "Healer") {
      var healing = ((this.mana * this.luck));
      target.hp += healing;
      console.log(this.name + " healed " + target.name);
      console.log("Health restored: " + healing);
    } else {
      console.log(this.name + " is not a healer!");
      return false;
    }
  };
}

var team = [];
var enemies = [];

var createPlayer = function() {
  if (team.length + enemies.length < 2) {
    console.log("New Character");

    inquirer.prompt([
      {
        name: "name",
        message: "Character Name: "
      }, {
        type: "list",
        choices: [
          "Warrior", "Mage", "Healer", "Berserker", "Warpriest"
        ],
        message: "Character Class: ",
        name: "type"
      }
    ]).then(function(answers) {
      var character = new Character(answers.name, answers.type);

      if (team.length < 1) {
        team.push(character);
        console.log(character.name + " added to your team!");
      } else {
        enemies.push(character);
        console.log(character.name + " added to the enemy team!");
      }
      createPlayer();
    });
  } else {
    console.log("---------------------");
    console.log("Hero Team");
    console.log("---------------------");
    for (var i = 0; i < team.length; i++) {
      team[i].printStats();
    }
    console.log("---------------------");
    console.log("Enemy Team");
    console.log("---------------------");
    for (var j = 0; j < enemies.length; j++) {
      enemies[j].printStats();
    }
    playGame(0);
  }
};

function playGame(roundNumber) {
  if (team.length + enemies.length !== 1) {
    roundNumber++;
    console.log("------- Round " + roundNumber + " -------");

    var currentEnem = enemies[0];
    var currentChar;

    inquirer.prompt([
      {
        type: "list",
        choices: team,
        message: "Select a character",
        name: "start"
      }
    ]).then(function(answers) {
      var number = 0;

      for (var x = 0; x < team.length; x++) {
        if (team[x].name === answers.start) {
          number = [x];
          currentChar = team[number];
        }
      }

      if (Math.floor(Math.random() * 2) === 0) {
        currentChar.attack(currentEnem);
      } else {
        currentEnem.attack(currentChar);
      }

      if (currentChar.hp <= 0) {
        console.log(currentChar.name + " has died!");
        team.splice(team.indexOf(currentChar), 1);
      }

      if (currentEnem.hp <= 0) {
        console.log(currentEnem.name + " has died!");
        enemies.splice(enemies.indexOf(currentEnem), 1);
        currentEnem = enemies[1];
      }

      if (team.length === 0) {
        endGame();
      } else if (enemies.length === 0) {
        endGame();
      } else {
        playGame(roundNumber);
      };
    });
  }
}

function endGame() {
  console.log("---------------------");
  console.log("Game over!");
  if (team.length > 0) {
    console.log("The heroes have won!");
  } else {
    console.log("The enemies have prevailed...");
  }
  console.log("Come back again soon!");
};

createPlayer();
