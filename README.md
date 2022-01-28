<img src="https://i.ibb.co/z5CCZQg/GDG-2.png" alt="AutoPV logo" >
<br>

# AutoPV BOT


## Problem 
A PV summarizes the progress of a meeting and preserves its traces, so that members who couldn't attend would be able to know the improvements made.
Seeing that they list the actions carried out and the decisions taken by the meeting's members, these reports help to monitor the progress of the projects. 

The preparation of a pv must be done carefully, taking into account all the key stages of a meeting between the members such as:
the date and place of the meeting, members who attended, a summary of the debates, the resolutions adopted, the results of the votes, the reports and documents submitted to the meeting, etc.
But reducing several hours of meetings to a few words can take a great deal of time.

## Solution
Since this process is repeated after each meeting, we, as an inspired future engineers, thought of making this work more flexible and fast through developing a discord bot named “AutoPV”.
## how to set the bot ?

* First you have to colone this repo 
 ```git
 git clone https://github.com/GDGAlgiers/discord.js-bot-template
  ```
* then you have to put the token of your bot , and the guild id and the client id of your discord server , int the config.js file 


 ```
 {
	"clientId": "your client id ",
	"guildId": "your guild id",
	"token": "your bot's tokent"
}
  ```
* install the dependencies
```npm
npm install 
  ```
* run the bot.js file 
```node
node src/bot.js 
  ```
* Please set the Google drive API credentials to use the ClosePV command