// Game States
//    "WIN" state - Player robot has defeated all enemy-robots
//        * Fight all enemy-robots
//        * Defeat each enemy-robot
//    "LOSE" = Player robot's health is zero or less

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
        // Ask plaer if they'd like to fight to run
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

        // Remove enemy's health by subtracting the amoutn set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log (
            playerName + " attacked " + enemyName + ". " + " now has " + enemyHealth + " health remaining."
        )

        // Check enemy's health
        if ( enemyHealth <= 0 ) {
            window.alert( enemyName + " has died!" );

            // Award palyer money for winning
            playerMoney = playerMoney + 20;

            // Leave while() loop since enemy is dead
            break;
        } else {
            window.alert( enemyName + " still has " + enemyHealth + " health left." );
        }

        // Remove player's health by subtracting the amoutn set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health left."
        );

        // Check player's health
        if ( playerHealth <= 0 ) {
            window.alert( playerName + "has died!" );
            // Leave while() loop if player is dead
            break;
        } else {
            window.alert( playerName + " still has " + playerHealth + " health left." );
        }
    }
}

for( var i = 0; i < enemyNamesArr.length; i++ ) {
    var pickedEnemyName = enemyNamesArr[i];
    enemyHealth = 50;
    // Call fight function with enemy-robot
    fight( pickedEnemyName );
}