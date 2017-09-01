var inquirer = require("inquirer");

function Character(name, type) {
  var alive = "Alive";
  var dead = "Dead";

  this.name = name;
  this.type = type;
  this.level = 1;
  this.hp = function() {
    if (this.type === "Warrior") {
      (this.hp = (this.level * 100));
      console.log("Health: " + this.hp);
    } else if (this.type === "Mage") {
      (this.hp = (this.level * 90));
      console.log("Health: " + this.hp);
    } else if (this.type === "Healer") {
      (this.hp = (this.level * 120));
      console.log("Health: " + this.hp);
    } else if (this.type === "Berserker") {
      (this.hp = (this.level * 110));
      console.log("Health: " + this.hp);
    } else if (this.type === "Warpriest") {
      (this.hp = (this.level * 100));
      console.log("Health: " + this.hp);
    }
  };
  this.mana = function() {
    if (this.type === "Warrior") {
      (this.mana = (this.level * 50));
      console.log("Mana: " + this.mana);
    } else if (this.type === "Mage") {
      (this.mana = (this.level * 150));
      console.log("Mana: " + this.mana);
    } else if (this.type === "Healer") {
      (this.mana = (this.level * 175));
      console.log("Mana: " + this.mana);
    } else if (this.type === "Berserker") {
      (this.mana = (this.level * 25));
      console.log("Mana: " + this.mana);
    } else if (this.type === "Warpriest") {
      (this.mana = (this.level * 75));
      console.log("Mana: " + this.mana);
    }
  };
  this.offense = function() {
    if (this.type === "Warrior") {
      (this.offense = (this.level * 120));
      console.log("Offense: " + this.offense);
    } else if (this.type === "Mage") {
      (this.offense = (this.level * 70));
      console.log("Offense: " + this.offense);
    } else if (this.type === "Healer") {
      (this.offense = (this.level * 40));
      console.log("Offense: " + this.offense);
    } else if (this.type === "Berserker") {
      (this.offense = (this.level * 150));
      console.log("Offense: " + this.offense);
    } else if (this.type === "Warpriest") {
      (this.offense = (this.level * 100));
      console.log("Offense: " + this.offense);
    }
  };
  this.defense = function() {
    if (this.type === "Warrior") {
      (this.defense = (this.level * 100));
      console.log("Defense: " + this.defense);
    } else if (this.type === "Mage") {
      (this.defense = (this.level * 90));
      console.log("Defense: " + this.defense);
    } else if (this.type === "Healer") {
      (this.defense = (this.level * 70));
      console.log("Defense: " + this.defense);
    } else if (this.type === "Berserker") {
      (this.defense = (this.level * 80));
      console.log("Defense: " + this.defense);
    } else if (this.type === "Warpriest") {
      (this.defense = (this.level * 130));
      console.log("Defense: " + this.defense);
    }
  };
  this.speed = function() {
    if (this.type === "Warrior") {
      (this.speed = (this.level * 70));
      console.log("Speed: " + this.speed);
    } else if (this.type === "Mage") {
      (this.speed = (this.level * 60));
      console.log("Speed: " + this.speed);
    } else if (this.type === "Healer") {
      (this.speed = (this.level * 90));
      console.log("Speed: " + this.speed);
    } else if (this.type === "Berserker") {
      (this.speed = (this.level * 80));
      console.log("Speed: " + this.speed);
    } else if (this.type === "Warpriest") {
      (this.speed = (this.level * 75));
      console.log("Speed: " + this.speed);
    }
  };
  this.luck = Math.floor((Math.random() * 11) + 10);
  this.intelligence = function() {
    if (this.type === "Warrior") {
      (this.intelligence = (this.level * 60));
      console.log("Intelligence: " + this.intelligence);
    } else if (this.type === "Mage") {
      (this.intelligence = (this.level * 150));
      console.log("Intelligence: " + this.intelligence);
    } else if (this.type === "Healer") {
      (this.intelligence = (this.level * 100));
      console.log("Intelligence: " + this.intelligence);
    } else if (this.type === "Berserker") {
      (this.intelligence = (this.level * 30));
      console.log("Intelligence: " + this.intelligence);
    } else if (this.type === "Warpriest") {
      (this.intelligence = (this.level * 80));
      console.log("Intelligence: " + this.intelligence);
    }
  };
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
    console.log("Level: " + this.level);
    this.hp();
    this.mana();
    this.offense();
    this.defense();
    this.speed();
    console.log("Luck: " + this.luck);
    this.intelligence();
    this.status();
    console.log("---------------------");
  };
  this.attack = function(target) {
    var damage = ((this.offense * this.luck) / (target.defense * target.luck));
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
          "Warrior", "Mage", "Healer", "Berserker", "Warpriest"
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
