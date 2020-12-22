var playerName = window.prompt( "What is your robot's name?" );
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple values at once like this
console.log( playerName, playerAttack, playerHealth );

var enemyName = "Roborto";
var enemyHealth = 100;
var enemyAttack = 12;

var playerMoney = 10;

var fight = function() {
    // Alert players that they are starting the round
    window.alert( "Welcome to Robot Gladiators!" );

    var promptFight = window.prompt( "Would you like to FIGHT or SKIP this battle?  Enter FIGHT or SKIP to choose." );

    // If player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT" ) {
        // Remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerHealth;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if ( enemyHealth <= 0 ) {
            window.alert( enemyName + " has died!" );
        } else {
            window.alert( enemyName + " still has " + enemyHealth + " health left. " );
        }

        // Remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if ( playerHealth <= 0 ) {
            window.alert( playerName + " has died!" );
        } else {
            window.alert( playerName + " still has " + playerHealth + " health left." );
        }
    // If player choose to skip
    } else if ( promptFight === "skip" || promptFight === "SKIP" ) {
        // Confirm player wants to skip
        var confirmSkip = window.confirm( "Are you sure you'd like to quit?" );

        if ( confirmSkip ) {
            window.alert( playerName + " has decided to skip the fight.  Goodbye!" );
            // Subtract money from playerMoney for skipping
            playerMoney = playerMoney -2;
        }
        // if no (false), ask question again by running fight() again
        else {
            fight();
        }
    } else {
        window.alert( "You need to choose a valid option.  Try again!" );
    }
}

fight();