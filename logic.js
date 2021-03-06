var inquirer = require("inquirer");

var classes = require("./classes.js");

function Character(name, type) {
  var alive = "Alive";
  var dead = "Dead";

  var statType = ["Name: ", "Class: ", "Level: ", "HP: ", "Mana: ", "Offense: ", "Defense: ", "Speed: ", "Luck: ", "Intellect: "];

  this.name = name;
  this.type = type;
  this.level = 1;
  this.hp = this.level * classes.modifiers[this.type].hp;
  this.mana = this.level * classes.modifiers[this.type].mana;
  this.offense = this.level * classes.modifiers[this.type].offense;
  this.defense = this.level * classes.modifiers[this.type].defense;
  this.speed = this.level * classes.modifiers[this.type].speed;
  this.luck = Math.floor((Math.random() * 51) + 50);
  this.intelligence = this.level * classes.modifiers[this.type].intelligence;
  this.status = function() {
    if (this.hp > 0) {
      console.log("Status: " + alive);
    } else {
      console.log("Status: " + dead);
    }
  };

  var charStats = [this.name, this.type, this.level, this.hp, this.mana, this.offense, this.defense, this.speed, this.luck, this.intelligence];

  this.printStats = function() {
    for (var i = 0; i < charStats.length; i++) {
      console.log(statType[i] + charStats[i]);
    }
    this.status();
    console.log("---------------------");
  };
  this.attack = function(target) {
    var chanceModifier = Math.random();
    var damage = (((this.offense * target.defense) / (this.luck + target.luck)) * chanceModifier);
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
  if (team.length + enemies.length < 6) {
    console.log("New Character");

    inquirer.prompt([
      {
        name: "name",
        message: "Character Name: "
      }, {
        type: "list",
        choices: [
          "Warrior",
          "Mage",
          "Healer",
          "Berserker",
          "Warpriest"
        ],
        message: "Character Class: ",
        name: "type"
      }
    ]).then(function(answers) {
      var character = new Character(answers.name, answers.type);

      if (team.length < 3) {
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
