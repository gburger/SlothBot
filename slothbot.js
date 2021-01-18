const tmi = require('tmi.js');
const say = require('say');

//add shrimp facts here
const shrimpFacts = ['A shrimp can average about 6 inches while the longest ever found was at 16 inches',
              'There are 16 different stages of life are found in shrimp from egg to full adult.',
              'The average shrimp has 10 legs',
              'Every shrimp is actually born a male and then become females as they mature.',
              'The pistol shrimp can deliver an explosive attack hotter than the surface of the sun and loud enough to rupture a human ear drum.',
              'Some shrimp can live as long as six and a half years, while some only live about a year or so.',
              'The Hawaiian Red Shrimp is the logest living shrimp and can live up to 20 years',
              'An uncooked shrimp is called “green”.',
              'A female shrimp may lay 1,500 to 14,000 eggs',
              'May 9th is National Shrimp Day',
              'Most shrimp are omnivorous, but some are specialized for particular modes of feeding.',
			  'A mantis shrimp has claws that can break aquarium glass with one incredibly fast and powerful swing',
			  'Without fins, shrimp don\'t actually swim, but when they do move, they can only go backward.',
			  'Several shrimp species serve as cleaners for other fish, removing bloodsucking parasites from different fishes\' mouths.',
			  'Indo-Pacific shrimp live in tandem with corals, dining on their host\'s mucus and protecting them from predators',
			  'To attract fish, cleaning shrimp wave their white antennae and do a little dance.',
			  'Harlequin shrimp, from the Pacific and Indian oceans, use their flat, oversize claws to sever arms from sea stars for food.',
			  'It’s estimated that humans have been catching and eating shrimp as far back as 600 AD.',
			  'Snapping and clicking is thought to play a role in both how they socialize and how they intimidate other marine life.',
			  'Americans eat approximately one billion pounds of shrimp per year.',
			  'There are over 128 species of shrimp.'];

const slothFacts = ['Sloths have been known to grab their own arms, mistaking them for tree branches, and end up falling to their death.',
					'Sloths only enjoy, on average, one bowel movement a week. When they do finally do a #2, they can expel up to a third of their entire body weight.',
					'Sloths are 3 times faster in water than they are on land. Their preferred swimming style is the backstroke.',
					'The three-toed sloth can turn his head almost 360 degrees!',
					'Sloths give birth whilst hanging upside down.',
					'The sloths’ love of a long siesta is actually a misconception – sloths only sleep between 8 and 10 hours a day, much like us.',
					'At his fastest, a sloth will race you down the jungle floor at a blindingly fast speed of about 4 meters a minute!',
					'Algae grows on sloths’ fur, which camouflages them green. It is a much-needed protection against predators for these rather defenseless animals.',
					'Sloths can retain their grip hanging onto tree branches even after death.',
					'Sloths spend up to 90% of their lives hanging upside down.',
					'Though not all sloths are endangered, some of the six species are threatened by habitat loss. Deforestation in the tropical forests of South and Central America jeopardize the trees sloths rely on for food and shelter.',
					'The smallest sloth, called the pygmy three-toed sloth, is found only on a small island off the coast of Panama where it is critically endangered.',
					'Jaguars, snakes, and eagles are common predators of sloths, but deforestation and wildlife trafficking by humans are their most critical threats.',
					'Though sloths are considered either two-toed or three-toed, all sloths have three toes on their hind limbs. The difference is actually in the forelimbs, on which the two-toed sloth has two fingers.',
					'Millions of years ago, some ancestors of today\'s sloths were the size of elephants. Ground sloths, as they are called, used to roam the earth and graze from the treetops.',
					'No matter what time of day it is, you can find a sloth awake and active. Three-toed sloths are diurnal while two-toed sloths are nocturnal.',
					'Sloths are the slowest animals in the world. The top speed of a sloth is 0.003 miles per hour.',
					'When female sloths are in in heat, they let out loud screams to attract males. Sounds romantic!',
					'Mating is just about the only thing that sloths do quickly! The entire ordeal including foreplay—takes only 5 seconds.',
					'When sloths defecate, they descend from the trees and choose a spot at the base of their tree. While defecating, they perform a “poo dance,” moving side to side until they’re finished. They bury their waste, and it’s thought that they help nourish their tree in this way.',
					'Not only can sloths swim, they can also hold their breath for an astounding 40 minutes! They can slow their already-slow metabolism even further, to the point that their heart rate is less than a third of the normal rate.',
					'Sloths are not very sexually dimorphic. That means there aren’t many differences between males and females. It can be extremely difficult to tell if a sloth is male or female, and several zoos have received sloths of the wrong sex.',
					'Sloth mamas generally have one baby a year, who will stay with them until they’re five months old. Sloths learn which foods to eat by licking the lips of their mothers.',
					'Baby sloths are born with their eyes open and with all their fur and nails! They spend their first few months living on mama’s belly, nursing from nipples located in the mother sloth’s armpits.',
					'The world’s only sloth sanctuary is located in Costa Rica. The Sloth Sanctuary is run by “sloth whisperer” Judy Arroyo and is home to approximately 160 sloths, many whom have been orphaned or injured.',
					'Okay, creatures covered in algae might not smell sweet. But sloths do not stink—they don’t sweat or have natural body odor. This helps them avoid predators!',
					'Sloths have color vision, but their eyesight is very poor. They also have a very poor sense of hearing. Sloths rely mostly on their sense of touch and their sense of smell to find food.',
					'You can look at a sloth not only as an individual but as a whole ecosystem of fauna and flora. Some of these insects live only on sloths, and nowhere else on earth!',
					'Sloths have very long tongues! Sloth tongues can extend 10 to 12 inches out of their mouths!',
					];

//set minimum donation for a fact to be read
const shrimpdonationMin = 300 ;
const slothdonationMin  = 100;
const messagedonationMin = 500;
// set time in minutes for how often discord is posted
var   discordTimer = 10 * 60000;
// Define configuration options
const opts = {
  identity: {
    username: //put bot username here,
    password: //put bot oauth here
  },
  channels: [
    //channel bot to connect to goes here
  ]
};
const voice = 'Microsoft Zira Desktop'
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on("cheer", onCheerHandler);
setInterval(dropDiscord, discordTimer)

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if ((self)||(!msg.includes("!"))) { return; } // Ignore messages from the bot


  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!shrimpfact') { 
	const num = Math.floor(Math.random() * (shrimpFacts.length));
    client.say(target, shrimpFacts[num]);  
    console.log(`* Executed ${commandName} command`);
  
  }else if (commandName === '!slothfact') { 
	const num = Math.floor(Math.random() * (slothFacts.length));
    client.say(target, slothFacts[num]);  
    console.log(`* Executed ${commandName} command`);
  
  }else if(commandName == '!discord'){ 
    client.say(target, 'Join Slothy\'s discord https://discord.gg/t2dVj3k');
    console.log(`* Executed ${commandName} command`);
    console.log(say.getInstalledVoices());

  }else if(commandName == '!test'){ 
	  if((context.mod)||(context.badges.broadcaster)){
		  client.say(target, 'ShrimpBot is Here!')
		  say.speak("ShrimpBot is Here!", voice)
	  }
  }else if(commandName == '!commands'){ 
	 client.say(target, "!shrimpfact for shrimp fact || !slothfact for a sloth fact || !discord for the discord invite || cheering at least "+slothdonationMin+" bits will have a sloth fact read aloud on stream || cheering at least "+shrimpdonationMin+" bits will have a shrimp fact read aloud on stream || cheering at least "+messagedonationMin+" bits will have a message read aloud on stream");
	
  }else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  
}

//Called when a user cheers
function onCheerHandler(target, userstate, msg){
	//sloth fact lowest donation 
	if(userstate.bits >= slothdonationMin && userstate.bits < shrimpdonationMin){
        const num = Math.floor(Math.random() * (slothFacts.length));
		client.say(target, slothFacts[num]);  	
		say.speak(slothFacts[num],voice);
	}
	//shrimp fact middle donation 
	else if(userstate.bits >= shrimpdonationMin && userstate.bits < messagedonationMin ){
        const num = Math.floor(Math.random() * (shrimpFacts.length));
		client.say(target, shrimpFacts[num]);  	
		say.speak(shrimpFacts[num], voice)
	}
	//message high donation 
	else if(userstate.bits > messagedonationMin){	
		say.speak(msg, voice)
	}
	else{
    var username = userstate["display-name"];
		say.speak(username+"has cheered"+userstate.bits);
	}
}
//drop discord link in chat
function dropDiscord(){
  client.say(opts.channels[0], 'Join Slothy\'s discord https://discord.gg/t2dVj3k');
}

