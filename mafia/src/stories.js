const stories = [
  {
    dead: "Something very sad happened last night. One of you was on walking on your way home from the gym and caught a glance of themselves in a puddle on the street. Unfortunately their gaze was held on for too long and they were hit by a Mafia member in a minivan.",
    saved:
      "Something very sad happened last night. One of you was on walking on your way home from the gym and caught a glance of themselves in a puddle on the street. Their gaze was held on for too long and they were almost hit by a minivan until an angel swooped in to save the day.",
  },
  {
    dead: "I regret to inform you of a terrible accident that occurred. One of you slipped on a Mafia placed banana peel last night... and died.",
    saved:
      "I regret to inform you of a terrible accident that occurred last night. One of you slipped on a Mafia placed banana peel last night. Thankfully an angel had been preparing the victim with parkour techniques and the victim lived.",
  },
  {
    dead: "Something awful happened last night. One of you has been on a very strict diet recently and the mafia carefully replaced one of their organic peaches with a gmo peach. This person died instantly. ",
    saved:
      "Something awful happened last night. One of you has been on a very strict diet recently and the mafia carefully replaced one of their organic peaches with a gmo peach. This person would have died instantly if not for the EpiPen of a nearby angel.",
  },
  {
    dead: "The mafia are well aware of your fears and last night a humble fellow was walking through the park when they were instantly overcome with baby food falling from the sky. The victim was drowned in a cruel shower of gerber baby food. ",
    saved:
      "The mafia are well aware of your fears and last night a humble fellow was walking through the park when they were instantly overcome with baby food falling from the sky. The victim was drowned in a cruel shower of gerber baby food. Thankfully an angel was nearby with an umbrella. ",
  },
  {
    dead: "Not all of us were meant for the NFL. The Mafia convinced one of you to play in the super bowl. You made a good play and managed to tackle Travis Kelce, but an unfortunate encounter with swfities ended your life after the game. ",
    saved:
      "Not all of us were meant for the NFL. The Mafia convinced one of you to play in the super bowl. You made a good play and managed to tackle Travis Kelce, but an unfortunate encounter with swifties nearly ended your life after the game. Thankfully an angel was nearby to mend the wounds.",
  },
  {
    dead: "The Mafia hired Fergie to come sing the national anthem at your house. Unfortunately it was enough to kill you.",
    saved:
      "The Mafia hired Fergie to come sing the national anthem at your house. The angel was smart enough the slam the door closed.",
  },
  {
    dead: "A tragic accident occurred last night. The Mafia hired Shaquille O’Neil to sit on one of you in your sleep.",
    saved:
      "A tragic accident occurred last night. The Mafia hired Shaquille O’Neil to sit on one of you in your sleep. Thankfully the angel was able to repair the damaged ribcage.",
  },
];

export function getStory() {
  const randIndex = Math.floor(Math.random() * stories.length);
  return stories[randIndex];
}
