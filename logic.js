var inquirer = require("inquirer");
var mysql = require("mysql");
var classes = require("./classes.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "insecure",
  database: "simpleRPG_DB"
});

connection.connect(function(err) {
  if (err) {
    return console.log(err);
  }
  createPlayer();
});

function Character(name, type) {
  var alive = "Alive";
  var dead = "Dead";

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

  // var team = [];
  // var enemies = [];

  var createPlayer = function() {
      if (res.length < 6) {
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
          // team.push(character);
          // console.log(character.name + " added to your team!");
          connection.query("INSERT INTO characters SET ?", {
            char_name: character.name,
            char_class: character.type,
            char_hp: character.hp,
            char_mana: character.mana,
            char_offense: character.offense,
            char_defense: character.defense,
            char_speed: character.speed,
            char_luck: character.luck,
            char_intelligence: character.intelligence
          }, function(err, result) {
            if (err) {
              return console.log(err);
            };
          });
        });
      } else {
        connection.query("INSERT INTO characters SET ?", {
          char_name: character.name,
          char_class: character.class,
          char_hp: character.hp,
          char_mana: character.mana,
          char_offense: character.offense,
          char_defense: character.defense,
          char_speed: character.speed,
          char_luck: character.luck,
          char_intelligence: character.intelligence
        }, function(err, result) {
          if (err) {
            return console.log(err);
          } else {
            connection.query("SELECT * FROM characters", function(res) {
              console.log("---------------------");
              console.log("Hero Team");
              console.log("---------------------");
              for (var i = 0; i < res.length; i++) {
                res[i].printStats();
              }
              playGame(0);
            });
          };
        });
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
  };
};
