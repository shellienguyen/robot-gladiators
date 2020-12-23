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

var playerName = window.prompt( "What is your robot's name?" );
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNamesArr = [ "Roborto", "Amy Android", "Robo Trumble" ];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function( enemyName ) {
   // Repeat and execute as long as the enemy-robot is alive
   while(( enemyHealth > 0 ) && ( playerHealth > 0 )) {
      // Ask player if they'd like to fight or run
      var promptFight = window.prompt( "Would you like to FIGHT or SKIP this battle?  Enter FIGHT or SKIP to choose." );
        
      // If player picks skip confirm and then stop the loop
      if ( promptFight === "skip" || promptFight === "SKIP" ) {
         // Confirm player wants to skip
          var confirmSkip = window.confirm( "Are you sure you'd like to quit?" );

         // If yes (true), leave fight
         if ( confirmSkip ) {
            window.alert( playerName + " has decided to skip the fight.  Goodbye!" );
            // Subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log( "playerMoney ", playerMoney);
            break;
         }
      }

      // Remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log (
         playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      )

      // Check enemy's health
      if ( enemyHealth <= 0 ) {
         window.alert( enemyName + " has died!" );

         // Award palyer money for winning
         playerMoney = playerMoney + 20;

         // Leave while() loop since enemy is dead
         break;
      }
      else {
         window.alert( enemyName + " still has " + enemyHealth + " health left." );
      }

      // Remove player's health by subtracting the amoutn set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
         enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health left."
      );

      // Check player's health
      if ( playerHealth <= 0 ) {            
         window.alert( playerName + " has died!" );
         // Leave while() loop if player is dead
         break;
      }
      else {
        window.alert( playerName + " still has " + playerHealth + " health left." );
      }
   }
}

// Function to start a new game
var startGame = function() {
   // Reset the player stats
   playerHealth = 100;
   playerAttack = 10;
   playerMoney = 10;

   for( var i = 0; i < enemyNamesArr.length; i++ ) {
      if ( playerHealth > 0 ){
         // Let player know what round they are in
         window.alert( "Welcome to Robot Gladiators! Round " + ( i + 1 ));

         // Pick a new enemy to fight based on the index of the enemyNamesArr array
         var pickedEnemyName = enemyNamesArr[i];

         // Reset enemyHealth before starting a new fight
         enemyHealth = 50;

         // User debugger to pause script from running and check what's going
         //    on at that moment in the code
         // debugger;
      
         // Pass the pickedEnemyName variable's value into the fight function
         //   where it will assume the value of the enemyName parameter
         fight( pickedEnemyName );

         // If we are not at the last enemy in the array
         if (( playerHealth > 0 ) && ( i < ( enemyNamesArr.length -1 ))) {
            // Ask if player wants to use the store before the next round
            var storeConfirm = window.confirm( "The fight is over, visit the store before the next round?" );

            if ( storeConfirm ){
               shop();
            }
         }
      }
      else {
         window.alert( "You have lost your robot in battle!  Game Over!" );
         break;
      }
   }

   // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
   endGame();
}

// Function to end the entire game
var endGame = function() {
   if ( playerHealth > 0 ) {
      window.alert( "Great job, you have survived the game!  You now have a score of " + playerMoney + "." );
   }
   else {
      window.alert( "You have lost your robot in the battle." );
   }

   // Ask whether the player would like to play again
   var playAgainConfirm = window.confirm( "Would you like to play again?" );

   if (playAgainConfirm ) {
      // Restart the game
      startGame();
   }
   else {
      window.alert( "Thank you for playing Robot Gladiators!  Come back soon!" );
   }
}

var shop = function() {
   // Ask the player what they'd like to do
   var shopOptionPrompt = window.prompt(
      "Would you like to REfILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
   );

   // Use switch to carry out action
   switch( shopOptionPrompt ) {
      case "REFILL":
         if ( playerMoney >= 7 ) {
            window.alert ( "Refiling the player's health by 30 for 7 dollars." );

            // Increase health and decrease money
            playerHealth = playerHealth + 30;
            playerMoney = playerMoney - 7;
         }
         else {
            window.alert( "You don't have enough money!" );
         }

         break;
      case "refill":
         if ( playerMoney >= 7 ) {
            window.alert ( "Refiling the player's health by 30 for 7 dollars." );
   
            // Increase health and decrease money
            playerHealth = playerHealth + 30;
            playerMoney = playerMoney - 7;
         }
         else {
            window.alert( "You don't have enough money!" );
         }
   
         break;
      case "UPGRADE":
         if ( playerMoney >= 3 ) {
            window.alert( "Upgrading the player's attack by 6 for 3 dollars." );

            // Increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 3;
         }
         else {
            window.alert( "You don't have enough money!" );
         }

         break;
      case "upgrade":
         if ( playerMoney >= 3 ) {
            window.alert( "Upgrading the player's attack by 6 for 3 dollars." );
   
            // Increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 3;
         }
         else {
            window.alert( "You don't have enough money!" );
         }
   
         break;
      case "LEAVE":
         window.alert( "Leaving the store." );

         // Do nothing, the function will end
         break;
      case "leave":
         window.alert( "Leaving the store." );
   
         // Do nothing, the function will end
         break;
      default:
         window.alert( "You did not pick a valid option.  Try again." );

         // Call shop() again to force palyer to pick a valid option
         shop();
         break;
   }
}

// Start the game when the page loads
startGame();