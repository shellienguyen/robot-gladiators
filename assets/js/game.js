/*
PSEUDOCODE 1 - Game States
   "WIN" state - Player robot has defeated all enemy-robots
      * Fight all enemy-robots
      * Defeat each enemy-robot
   "LOSE" = Player robot's health is zero or less
*/

/*
PSEUDOCODES 2:
- Wrap the game logic in a startGame() function
- When the player is defeated or there are no more enemies, call an endGame() function that:
   - Alerts the player's total stats
   - Asks the player if they want to play again
   - If yes, call startGame() to restart the game
- After the player skips or defeats an enemy (and there are still more robots to fight):
   - Ask the player if they want to "shop"
   - If no, continue as normal
   - If yes, call the shop() function
   - In the shop() function, ask player if they want to "refill" health, "upgrade" attack, or
      "leave" the shop
   - If refill, subtract money points from player and increase health
   - If upgrade, subtract money points from player and increase attack power
   - If leave, alert goodbuy and exit the function
   - If any other invalid option, call shop() again
*/

// Function to generate a random numeric value
var randomNumber = function( min, max ) {
   var value = Math.floor(( Math.random() * (max - min + 1 )) + min );
   
   return value;
};

var playerInfo = {
   name: window.prompt( "What is your robot's name?" ),
   health: 100,
   attack: 10,
   money: 10,
   reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
   },
   refillHealth: function() {
      if ( this.money >= 7 ) {
         window.alert( "Refilling the player's health by 30 for $7." );
         this.health += 30;
         this.money -= 7;
      }
      else {
         window.alert( "You don't have enough money!" );
      }
   },
   upgradeAttack: function() {
      if ( this.money >= 3 ) {
         window.alert( "Upgrading the player's attack by 6 for $3." );
         this.attack += 6;
         this.money -= 3;
      }
      else {
         window.alert( "You don't have enough money!" );
      }
   }
};

var enemyInfo = [
   {
      name: "Roborto",
      attack: randomNumber( 10, 14 )
   },
   {
      name: "Amy Android",
      attack: randomNumber( 10, 14 )
   },
   {
      name: "Robo Trumble",
      attack: randomNumber( 10, 14 )
   }
];

var fight = function( enemy ) {
   console.log( enemy );

   // Repeat and execute as long as the enemy-robot is alive
   while(( enemy.health > 0 ) && ( playerInfo.health > 0 )) {
      // Ask player if they'd like to fight or run
      var promptFight = window.prompt( "Would you like to FIGHT or SKIP this battle?  Enter FIGHT or SKIP to choose." );
        
      // If player picks skip confirm and then stop the loop
      if ( promptFight === "skip" || promptFight === "SKIP" ) {
         // Confirm player wants to skip
          var confirmSkip = window.confirm( "Are you sure you'd like to quit?" );

         // If yes (true), leave fight
         if ( confirmSkip ) {
            window.alert( playerInfo.name + " has decided to skip the fight.  Goodbye!" );
            // Subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max( 0, playerInfo.money - 10 );
            console.log( "playerInfo.money ", playerInfo.money);
            break;
         };
      };

      // Remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber( playerInfo.attack - 3, playerInfo.attack );
      enemy.health = Math.max( 0, enemy.health - damage );
      console.log (
         playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      )

      // Check enemy's health
      if ( enemy.health <= 0 ) {
         window.alert( enemy.name + " has died!" );

         // Award palyer money for winning
         playerInfo.money = playerInfo.money + 20;

         // Leave while() loop since enemy is dead
         break;
      }
      else {
         window.alert( enemy.name + " still has " + enemy.health + " health left." );
      };

      // Remove player's health by subtracting the amoutn set in the enemy.attack variable
      var damage = randomNumber( enemy.attack - 3, enemy.attack );
      playerInfo.health = Math.max( 0, playerInfo.health - damage );
      console.log(
         enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health left."
      );

      // Check player's health
      if ( playerInfo.health <= 0 ) {            
         window.alert( playerInfo.name + " has died!" );
         // Leave while() loop if player is dead
         break;
      }
      else {
        window.alert( playerInfo.name + " still has " + playerInfo.health + " health left." );
      };
   };
};

// Function to start a new game
var startGame = function() {
   // Reset the player stats
   playerInfo.reset();

   for( var i = 0; i < enemyInfo.length; i++ ) {
      if ( playerInfo.health > 0 ){
         // Let player know what round they are in
         window.alert( "Welcome to Robot Gladiators! Round " + ( i + 1 ));

         // Pick a new enemy to fight based on the index of the enemy.namesArr array
         var pickedEnemyObj = enemyInfo[i];

         // Reset enemy.health before starting a new fight
         pickedEnemyObj.health = randomNumber( 40, 60 );

         // User debugger to pause script from running and check what's going
         //    on at that moment in the code
         // debugger;
      
         // Pass the pickedenemy.name variable's value into the fight function
         //   where it will assume the value of the enemy.name parameter
         fight( pickedEnemyObj );

         // If we are not at the last enemy in the array
         if (( playerInfo.health > 0 ) && ( i < ( enemyInfo.length -1 ))) {
            // Ask if player wants to use the store before the next round
            var storeConfirm = window.confirm( "The fight is over, visit the store before the next round?" );

            if ( storeConfirm ){
               shop();
            };
         };
      }
      else {
         window.alert( "You have lost your robot in battle!  Game Over!" );
         break;
      };
   };

   // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
   endGame();
};

// Function to end the entire game
var endGame = function() {
   if ( playerInfo.health > 0 ) {
      window.alert( "Great job, you have survived the game!  You now have a score of " + playerInfo.money + "." );
   }
   else {
      window.alert( "You have lost your robot in the battle." );
   };

   // Ask whether the player would like to play again
   var playAgainConfirm = window.confirm( "Would you like to play again?" );

   if (playAgainConfirm ) {
      // Restart the game
      startGame();
   }
   else {
      window.alert( "Thank you for playing Robot Gladiators!  Come back soon!" );
   };
};

var shop = function() {
   // Ask the player what they'd like to do
   var shopOptionPrompt = window.prompt(
      "Would you like to REfILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
   );

   // Use switch to carry out action
   switch( shopOptionPrompt ) {
      case "REFILL":
      case "refill":
         playerInfo.refillHealth();
         break;
      case "UPGRADE":
      case "upgrade":
         playerInfo.upgradeAttack();
         break;
      case "LEAVE":
      case "leave":
         window.alert( "Leaving the store." );
   
         // Do nothing, the function will end
         break;
      default:
         window.alert( "You did not pick a valid option.  Try again." );

         // Call shop() again to force palyer to pick a valid option
         shop();
         break;
   };
};

// Start the game when the page loads
startGame();