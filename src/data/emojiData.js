// ── Mojimelt original data layer ────────────────────────────────────────────
// Every entry is original metadata used by our own layered SVG renderer.
// No third-party artwork is embedded here — just trait tags.

export const EMOJI_CATEGORIES = [
  { id: 'recent', label: 'Recently used' },
  { id: 'smileys', label: 'Smileys' },
  { id: 'people', label: 'People' },
  { id: 'animals', label: 'Animals' },
  { id: 'food', label: 'Food' },
  { id: 'activities', label: 'Activities' },
  { id: 'travel', label: 'Travel' },
  { id: 'objects', label: 'Objects' },
  { id: 'symbols', label: 'Symbols' },
];

/**
 * traits:
 *  base   → face fill theme
 *  eyes   → eye style
 *  mouth  → mouth style
 *  extras → wearable / attached features
 *  effects→ ambient particles around face
 *  mood   → warm | cool | mischievous | dreamy … (used for fallback blending)
 */
export const EMOJIS = [
  // ── Smileys ─────────────────────────────────────────────
  { char: '😀', name: 'Grinning face', keywords: 'happy smile grin joy', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '😂', name: 'Laughing tears', keywords: 'laugh cry tears funny lol', category: 'smileys', traits: { base: 'yellow', eyes: 'laughing', mouth: 'laugh-open', extras: ['tears-happy'], effects: ['droplets'], mood: 'joyful' } },
  { char: '😭', name: 'Loud crying', keywords: 'cry sad tears sob bawl', category: 'smileys', traits: { base: 'yellow', eyes: 'crying', mouth: 'cry-open', extras: ['tears-sad', 'blush'], effects: ['droplets'], mood: 'sad' } },
  { char: '😎', name: 'Cool shades', keywords: 'cool sunglasses chill confident', category: 'smileys', traits: { base: 'yellow', eyes: 'cool', mouth: 'smirk', extras: ['shades'], effects: ['sparkles'], mood: 'cool' } },
  { char: '😈', name: 'Devil', keywords: 'evil horns purple mischievous demon', category: 'smileys', traits: { base: 'purple', eyes: 'devil', mouth: 'smirk', extras: ['horns'], effects: ['flames'], mood: 'mischievous' } },
  { char: '😇', name: 'Angel', keywords: 'halo innocent heavenly holy', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'smile', extras: ['halo'], effects: ['sparkles'], mood: 'dreamy' } },
  { char: '🥶', name: 'Freezing', keywords: 'cold ice winter frozen frost', category: 'smileys', traits: { base: 'ice', eyes: 'cold', mouth: 'frown', extras: ['ice'], effects: ['snow'], mood: 'cool' } },
  { char: '🥵', name: 'Overheated', keywords: 'hot sweating heat summer', category: 'smileys', traits: { base: 'red', eyes: 'tired', mouth: 'panting', extras: ['sweat'], effects: ['flames'], mood: 'wild' } },
  { char: '🤯', name: 'Mind blown', keywords: 'explode shock wow mind', category: 'smileys', traits: { base: 'yellow', eyes: 'surprised', mouth: 'amazed', extras: ['burst'], effects: ['stars', 'lightning'], mood: 'wild' } },
  { char: '🥳', name: 'Party', keywords: 'celebrate birthday party hat confetti', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'laugh-open', extras: ['party'], effects: ['confetti'], mood: 'joyful' } },
  { char: '😴', name: 'Sleepy', keywords: 'sleep tired snore night zzz', category: 'smileys', traits: { base: 'yellow', eyes: 'sleepy', mouth: 'sleep', extras: [], effects: ['zzz'], mood: 'dreamy' } },
  { char: '🤖', name: 'Robot', keywords: 'robot machine ai metal tech', category: 'smileys', traits: { base: 'robot', eyes: 'robot', mouth: 'robot', extras: ['antennae-metal'], effects: ['sparkles'], mood: 'cool' } },
  { char: '👽', name: 'Alien', keywords: 'ufo space extraterrestrial green', category: 'smileys', traits: { base: 'alien', eyes: 'alien', mouth: 'small', extras: ['antennae'], effects: ['stars'], mood: 'mischievous' } },
  { char: '👻', name: 'Ghost', keywords: 'spooky halloween boo spirit', category: 'smileys', traits: { base: 'ghost', eyes: 'surprised', mouth: 'amazed', extras: [], effects: ['sparkles'], mood: 'dreamy' } },
  { char: '💀', name: 'Skull', keywords: 'dead skeleton spooky pirate', category: 'smileys', traits: { base: 'bone', eyes: 'skull', mouth: 'skull', extras: [], effects: [], mood: 'wild' } },
  { char: '🤡', name: 'Clown', keywords: 'circus funny clown nose', category: 'smileys', traits: { base: 'pale', eyes: 'starry', mouth: 'clown', extras: ['clown-nose', 'rainbow-hair'], effects: ['confetti'], mood: 'joyful' } },
  { char: '😻', name: 'Heart eyes cat', keywords: 'cat love hearts cute kitty', category: 'smileys', traits: { base: 'orange', eyes: 'hearts', mouth: 'cat', extras: ['cat-ears', 'whiskers'], effects: ['hearts'], mood: 'loving' } },
  { char: '🙄', name: 'Eye roll', keywords: 'annoyed sarcastic whatever', category: 'smileys', traits: { base: 'yellow', eyes: 'rolling', mouth: 'flat', extras: [], effects: [], mood: 'cool' } },
  { char: '🥺', name: 'Pleading', keywords: 'puppy cute beg please', category: 'smileys', traits: { base: 'yellow', eyes: 'pleading', mouth: 'small', extras: ['blush'], effects: ['sparkles'], mood: 'loving' } },
  { char: '😤', name: 'Triumph steam', keywords: 'angry huff proud steam', category: 'smileys', traits: { base: 'red', eyes: 'angry', mouth: 'frown', extras: ['steam'], effects: ['flames'], mood: 'wild' } },
  { char: '🤠', name: 'Cowboy', keywords: 'cowboy hat yeehaw western', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'grin', extras: ['cowboy-hat'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🧐', name: 'Monocle', keywords: 'fancy curious monocle smart', category: 'smileys', traits: { base: 'yellow', eyes: 'monocle', mouth: 'flat', extras: ['monocle'], effects: [], mood: 'cool' } },

  // ── People / gesture ─────────────────────────────
  { char: '👑', name: 'Crown', keywords: 'king queen royal crown majestic', category: 'people', traits: { base: 'gold', eyes: 'sparkle-royal', mouth: 'royal-smile', extras: ['crown'], effects: ['sparkles'], mood: 'royal' } },
  { char: '🎩', name: 'Top hat', keywords: 'fancy magic gentleman hat', category: 'people', traits: { base: 'yellow', eyes: 'wink', mouth: 'smirk', extras: ['top-hat'], effects: ['sparkles'], mood: 'cool' } },
  { char: '🧸', name: 'Teddy', keywords: 'bear cute plush toy teddy', category: 'people', traits: { base: 'brown', eyes: 'happy', mouth: 'smile', extras: ['bear-ears'], effects: [], mood: 'loving' } },
  { char: '💋', name: 'Kiss', keywords: 'lips kiss love lipstick', category: 'people', traits: { base: 'pink', eyes: 'hearts', mouth: 'kiss', extras: ['blush'], effects: ['hearts'], mood: 'loving' } },
  { char: '🕶️', name: 'Shades', keywords: 'sunglasses cool shades style', category: 'people', traits: { base: 'yellow', eyes: 'cool', mouth: 'smile', extras: ['shades'], effects: [], mood: 'cool' } },
  { char: '🧙', name: 'Wizard', keywords: 'magic wizard spell hat', category: 'people', traits: { base: 'pale', eyes: 'mischievous', mouth: 'smirk', extras: ['wizard-hat'], effects: ['stars'], mood: 'mischievous' } },

  // ── Animals ───────────────────────────────────────
  { char: '🐸', name: 'Frog', keywords: 'frog toad green ribbit', category: 'animals', traits: { base: 'green', eyes: 'frog', mouth: 'frog-smile', extras: ['blush'], effects: ['droplets'], mood: 'joyful' } },
  { char: '🐱', name: 'Cat', keywords: 'cat kitty kitten meow', category: 'animals', traits: { base: 'orange', eyes: 'happy', mouth: 'cat', extras: ['cat-ears', 'whiskers'], effects: [], mood: 'loving' } },
  { char: '🦊', name: 'Fox', keywords: 'fox clever orange', category: 'animals', traits: { base: 'orange', eyes: 'mischievous', mouth: 'smirk', extras: ['fox-ears'], effects: [], mood: 'mischievous' } },
  { char: '🐼', name: 'Panda', keywords: 'panda bear cute bamboo', category: 'animals', traits: { base: 'panda', eyes: 'panda', mouth: 'small', extras: ['panda-ears'], effects: [], mood: 'dreamy' } },
  { char: '🦁', name: 'Lion', keywords: 'lion king mane roar', category: 'animals', traits: { base: 'orange', eyes: 'angry', mouth: 'frown', extras: ['mane'], effects: [], mood: 'wild' } },
  { char: '🐷', name: 'Pig', keywords: 'pig oink cute snout', category: 'animals', traits: { base: 'pink', eyes: 'happy', mouth: 'snout', extras: ['pig-ears'], effects: [], mood: 'joyful' } },
  { char: '🐙', name: 'Octopus', keywords: 'octopus squid tentacles sea', category: 'animals', traits: { base: 'purple', eyes: 'surprised', mouth: 'small', extras: ['tentacles'], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🦄', name: 'Unicorn', keywords: 'unicorn magic rainbow horn fantasy', category: 'animals', traits: { base: 'lavender', eyes: 'starry', mouth: 'smile', extras: ['unicorn-horn', 'mane-rainbow'], effects: ['rainbow', 'sparkles'], mood: 'dreamy' } },
  { char: '🐝', name: 'Bee', keywords: 'bee honey buzz wings', category: 'animals', traits: { base: 'gold', eyes: 'happy', mouth: 'smile', extras: ['bee-wings', 'antennae-bee'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🦖', name: 'Dino', keywords: 'dinosaur t-rex roar jurassic', category: 'animals', traits: { base: 'green', eyes: 'angry', mouth: 'dino', extras: ['spikes'], effects: [], mood: 'wild' } },

  // ── Food ──────────────────────────────────────────
  { char: '🔥', name: 'Fire', keywords: 'fire flame hot lit burn', category: 'food', traits: { base: 'lava', eyes: 'fiery', mouth: 'grin', extras: ['fire'], effects: ['flames'], mood: 'wild' } },
  { char: '🍩', name: 'Donut', keywords: 'donut doughnut sweet pink', category: 'food', traits: { base: 'donut', eyes: 'happy', mouth: 'smile', extras: ['sprinkles'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🍕', name: 'Pizza', keywords: 'pizza slice cheese italian', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: ['pepperoni'], effects: [], mood: 'joyful' } },
  { char: '🧁', name: 'Cupcake', keywords: 'cupcake sweet frosting birthday', category: 'food', traits: { base: 'pink', eyes: 'starry', mouth: 'smile', extras: ['frosting', 'cherry'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '☕', name: 'Coffee', keywords: 'coffee latte morning cafe espresso', category: 'food', traits: { base: 'brown', eyes: 'sleepy', mouth: 'smile', extras: ['steam'], effects: ['zzz'], mood: 'dreamy' } },
  { char: '🍦', name: 'Ice cream', keywords: 'icecream softserve summer sweet', category: 'food', traits: { base: 'ice', eyes: 'happy', mouth: 'smile', extras: ['cherry'], effects: ['snow'], mood: 'joyful' } },
  { char: '🌶️', name: 'Chili', keywords: 'spicy hot pepper chili', category: 'food', traits: { base: 'red', eyes: 'angry', mouth: 'panting', extras: ['fire'], effects: ['flames'], mood: 'wild' } },
  { char: '🍉', name: 'Watermelon', keywords: 'melon summer fruit fresh', category: 'food', traits: { base: 'green', eyes: 'happy', mouth: 'grin', extras: ['seeds'], effects: [], mood: 'joyful' } },

  // ── Activities ────────────────────────────────────
  { char: '⚽', name: 'Soccer', keywords: 'football soccer sport ball', category: 'activities', traits: { base: 'panda', eyes: 'happy', mouth: 'grin', extras: ['patches'], effects: [], mood: 'joyful' } },
  { char: '🎮', name: 'Gaming', keywords: 'game controller gamer play', category: 'activities', traits: { base: 'purple', eyes: 'robot', mouth: 'grin', extras: ['headset'], effects: ['lightning'], mood: 'cool' } },
  { char: '🎃', name: 'Pumpkin', keywords: 'halloween pumpkin spooky jack', category: 'activities', traits: { base: 'orange', eyes: 'devil', mouth: 'dino', extras: ['stem'], effects: ['flames'], mood: 'mischievous' } },
  { char: '🎄', name: 'Tree', keywords: 'christmas tree holiday winter', category: 'activities', traits: { base: 'green', eyes: 'starry', mouth: 'smile', extras: ['star-top', 'ornaments'], effects: ['snow', 'sparkles'], mood: 'joyful' } },
  { char: '🎧', name: 'Headphones', keywords: 'music dj headphones listen', category: 'activities', traits: { base: 'yellow', eyes: 'happy', mouth: 'smile', extras: ['headset'], effects: ['music'], mood: 'cool' } },
  { char: '🚀', name: 'Rocket', keywords: 'rocket space launch moon', category: 'activities', traits: { base: 'pale', eyes: 'surprised', mouth: 'amazed', extras: ['flame-jet'], effects: ['stars', 'flames'], mood: 'wild' } },

  // ── Travel ────────────────────────────────────────
  { char: '🌙', name: 'Moon', keywords: 'moon night sleep lunar', category: 'travel', traits: { base: 'pale', eyes: 'sleepy', mouth: 'sleep', extras: [], effects: ['stars', 'zzz'], mood: 'dreamy' } },
  { char: '☀️', name: 'Sun', keywords: 'sun sunny summer bright', category: 'travel', traits: { base: 'gold', eyes: 'happy', mouth: 'laugh-open', extras: ['rays'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🌈', name: 'Rainbow', keywords: 'rainbow pride colorful magic', category: 'travel', traits: { base: 'lavender', eyes: 'starry', mouth: 'smile', extras: ['mane-rainbow'], effects: ['rainbow', 'sparkles'], mood: 'dreamy' } },
  { char: '❄️', name: 'Snowflake', keywords: 'snow winter cold ice', category: 'travel', traits: { base: 'ice', eyes: 'cold', mouth: 'smile', extras: ['ice'], effects: ['snow'], mood: 'cool' } },
  { char: '🌊', name: 'Wave', keywords: 'ocean sea water wave surf', category: 'travel', traits: { base: 'blue', eyes: 'happy', mouth: 'grin', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '⭐', name: 'Star', keywords: 'star shine sparkle favorite', category: 'travel', traits: { base: 'gold', eyes: 'starry', mouth: 'smile', extras: [], effects: ['stars', 'sparkles'], mood: 'dreamy' } },

  // ── Objects ───────────────────────────────────────
  { char: '💎', name: 'Gem', keywords: 'diamond gem jewel precious', category: 'objects', traits: { base: 'cyan', eyes: 'starry', mouth: 'smile', extras: ['facets'], effects: ['sparkles'], mood: 'royal' } },
  { char: '🤍', name: 'White heart', keywords: 'heart love white pure', category: 'objects', traits: { base: 'pale', eyes: 'hearts', mouth: 'kiss', extras: ['blush'], effects: ['hearts'], mood: 'loving' } },
  { char: '❤️', name: 'Red heart', keywords: 'heart love red valentine', category: 'objects', traits: { base: 'red', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💡', name: 'Idea', keywords: 'idea lightbulb bright genius', category: 'objects', traits: { base: 'gold', eyes: 'surprised', mouth: 'grin', extras: ['rays'], effects: ['sparkles', 'lightning'], mood: 'cool' } },
  { char: '🎁', name: 'Gift', keywords: 'gift present birthday surprise', category: 'objects', traits: { base: 'red', eyes: 'starry', mouth: 'laugh-open', extras: ['bow'], effects: ['confetti'], mood: 'joyful' } },
  { char: '🕹️', name: 'Joystick', keywords: 'arcade joystick retro game', category: 'objects', traits: { base: 'red', eyes: 'robot', mouth: 'grin', extras: ['headset'], effects: ['lightning'], mood: 'cool' } },

  // ── Symbols ───────────────────────────────────────
  { char: '✨', name: 'Sparkles', keywords: 'sparkle shine magic glitter', category: 'symbols', traits: { base: 'lavender', eyes: 'starry', mouth: 'smile', extras: [], effects: ['sparkles', 'stars'], mood: 'dreamy' } },
  { char: '💤', name: 'Snore', keywords: 'sleep zzz tired night', category: 'symbols', traits: { base: 'blue', eyes: 'sleepy', mouth: 'sleep', extras: [], effects: ['zzz'], mood: 'dreamy' } },
  { char: '💩', name: 'Poop', keywords: 'poop funny poo silly', category: 'symbols', traits: { base: 'poop', eyes: 'happy', mouth: 'grin', extras: ['swirl', 'flies'], effects: [], mood: 'joyful' } },
  { char: '💯', name: 'Hundred', keywords: 'hundred perfect score 100', category: 'symbols', traits: { base: 'red', eyes: 'cool', mouth: 'grin', extras: ['shades'], effects: ['sparkles'], mood: 'cool' } },
  { char: '🌀', name: 'Vortex', keywords: 'spiral dizzy hypnotic swirl', category: 'symbols', traits: { base: 'blue', eyes: 'rolling', mouth: 'amazed', extras: ['swirl-face'], effects: ['stars'], mood: 'wild' } },
  { char: '👁️', name: 'Eye', keywords: 'eye watch see vision', category: 'symbols', traits: { base: 'pale', eyes: 'third-eye-big', mouth: 'small', extras: ['third-eye'], effects: [], mood: 'mischievous' } },

  // ── Smileys (batch 2) ───────────────────────────────────
  { char: '😍', name: 'Heart eyes', keywords: 'love crush adore hearts eyes', category: 'smileys', traits: { base: 'pink', eyes: 'hearts', mouth: 'smile', extras: ['blush'], effects: ['hearts'], mood: 'loving' } },
  { char: '🥰', name: 'Smiling hearts', keywords: 'love affection cute hearts', category: 'smileys', traits: { base: 'pink', eyes: 'hearts', mouth: 'smile', extras: ['blush'], effects: ['hearts', 'sparkles'], mood: 'loving' } },
  { char: '😜', name: 'Winking tongue', keywords: 'silly wink playful joke', category: 'smileys', traits: { base: 'yellow', eyes: 'wink', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🤪', name: 'Zany face', keywords: 'crazy goofy wild silly', category: 'smileys', traits: { base: 'yellow', eyes: 'rolling', mouth: 'grin', extras: [], effects: ['stars'], mood: 'wild' } },
  { char: '😏', name: 'Smirk', keywords: 'smug sly confident smirk', category: 'smileys', traits: { base: 'yellow', eyes: 'mischievous', mouth: 'smirk', extras: [], effects: [], mood: 'cool' } },
  { char: '😬', name: 'Grimace', keywords: 'awkward nervous yikes grimace', category: 'smileys', traits: { base: 'pale', eyes: 'surprised', mouth: 'grin', extras: ['sweat'], effects: [], mood: 'dreamy' } },
  { char: '🤔', name: 'Thinking', keywords: 'think hmm curious ponder', category: 'smileys', traits: { base: 'yellow', eyes: 'mischievous', mouth: 'flat', extras: ['monocle'], effects: [], mood: 'cool' } },
  { char: '😳', name: 'Flushed', keywords: 'blush shy embarrassed red', category: 'smileys', traits: { base: 'pink', eyes: 'pleading', mouth: 'small', extras: ['blush', 'sweat'], effects: [], mood: 'loving' } },
  { char: '🤧', name: 'Sneezing', keywords: 'sneeze sick cold tissue', category: 'smileys', traits: { base: 'pale', eyes: 'tired', mouth: 'panting', extras: ['sweat'], effects: ['droplets'], mood: 'dreamy' } },
  { char: '😷', name: 'Masked', keywords: 'mask sick doctor safe', category: 'smileys', traits: { base: 'pale', eyes: 'happy', mouth: 'smile', extras: ['mask'], effects: [], mood: 'dreamy' } },
  { char: '🥴', name: 'Dizzy', keywords: 'drunk dizzy woozy confused', category: 'smileys', traits: { base: 'green', eyes: 'rolling', mouth: 'flat', extras: [], effects: ['stars'], mood: 'wild' } },
  { char: '😵', name: 'Knocked out', keywords: 'dead dizzy faint ko', category: 'smileys', traits: { base: 'pale', eyes: 'sleepy', mouth: 'amazed', extras: [], effects: ['stars'], mood: 'wild' } },
  { char: '🫠', name: 'Melting', keywords: 'melt hot dissolve embarrassed', category: 'smileys', traits: { base: 'yellow', eyes: 'pleading', mouth: 'frown', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🥸', name: 'Disguised', keywords: 'disguise spy incognito glasses', category: 'smileys', traits: { base: 'pale', eyes: 'happy', mouth: 'smirk', extras: ['monocle'], effects: [], mood: 'mischievous' } },

  // ── People (batch 2) ────────────────────────────────────
  { char: '👸', name: 'Princess', keywords: 'princess royal crown pink girl', category: 'people', traits: { base: 'pink', eyes: 'happy', mouth: 'smile', extras: ['crown', 'blush'], effects: ['sparkles', 'hearts'], mood: 'royal' } },
  { char: '🤴', name: 'Prince', keywords: 'prince royal crown king', category: 'people', traits: { base: 'gold', eyes: 'wink', mouth: 'smirk', extras: ['crown'], effects: ['sparkles'], mood: 'royal' } },
  { char: '🎅', name: 'Santa', keywords: 'santa christmas claus beard holiday', category: 'people', traits: { base: 'red', eyes: 'happy', mouth: 'laugh-open', extras: ['santa-hat', 'beard'], effects: ['snow'], mood: 'joyful' } },
  { char: '🤶', name: 'Mrs Claus', keywords: 'mrs claus christmas holiday', category: 'people', traits: { base: 'pink', eyes: 'happy', mouth: 'smile', extras: ['santa-hat', 'blush'], effects: ['snow'], mood: 'joyful' } },
  { char: '🧛', name: 'Vampire', keywords: 'vampire dracula fangs blood spooky', category: 'people', traits: { base: 'pale', eyes: 'devil', mouth: 'dino', extras: [], effects: [], mood: 'mischievous' } },
  { char: '🧜', name: 'Mermaid', keywords: 'mermaid ocean sea siren', category: 'people', traits: { base: 'cyan', eyes: 'starry', mouth: 'smile', extras: [], effects: ['droplets', 'sparkles'], mood: 'dreamy' } },
  { char: '🧚', name: 'Fairy', keywords: 'fairy magic wings pixie', category: 'people', traits: { base: 'lavender', eyes: 'starry', mouth: 'smile', extras: ['bee-wings'], effects: ['sparkles', 'stars'], mood: 'dreamy' } },
  { char: '🥷', name: 'Ninja', keywords: 'ninja stealth shadow warrior', category: 'people', traits: { base: 'midnight', eyes: 'angry', mouth: 'flat', extras: [], effects: ['stars'], mood: 'cool' } },
  { char: '🦸', name: 'Superhero', keywords: 'hero super cape powers mask', category: 'people', traits: { base: 'blue', eyes: 'cool', mouth: 'grin', extras: ['shades'], effects: ['lightning', 'sparkles'], mood: 'wild' } },

  // ── Animals (batch 2) ───────────────────────────────────
  { char: '🐶', name: 'Dog', keywords: 'dog puppy woof pet', category: 'animals', traits: { base: 'brown', eyes: 'happy', mouth: 'grin', extras: ['dog-ears'], effects: [], mood: 'joyful' } },
  { char: '🐰', name: 'Bunny', keywords: 'bunny rabbit easter cute', category: 'animals', traits: { base: 'pink', eyes: 'happy', mouth: 'cat', extras: ['bunny-ears', 'whiskers'], effects: [], mood: 'loving' } },
  { char: '🐯', name: 'Tiger', keywords: 'tiger stripes roar wild', category: 'animals', traits: { base: 'orange', eyes: 'happy', mouth: 'cat', extras: ['tiger-stripes', 'whiskers'], effects: [], mood: 'wild' } },
  { char: '🐨', name: 'Koala', keywords: 'koala sleepy cute australia', category: 'animals', traits: { base: 'pale', eyes: 'sleepy', mouth: 'small', extras: ['bear-ears', 'blush'], effects: [], mood: 'dreamy' } },
  { char: '🐵', name: 'Monkey', keywords: 'monkey cheeky banana silly', category: 'animals', traits: { base: 'brown', eyes: 'happy', mouth: 'grin', extras: ['bear-ears'], effects: [], mood: 'joyful' } },
  { char: '🦉', name: 'Owl', keywords: 'owl wise night hoot', category: 'animals', traits: { base: 'brown', eyes: 'surprised', mouth: 'small', extras: ['blush'], effects: ['stars'], mood: 'dreamy' } },
  { char: '🐧', name: 'Penguin', keywords: 'penguin winter waddle ice', category: 'animals', traits: { base: 'panda', eyes: 'happy', mouth: 'small', extras: [], effects: ['snow'], mood: 'joyful' } },
  { char: '🦩', name: 'Flamingo', keywords: 'flamingo pink tropical fancy', category: 'animals', traits: { base: 'pink', eyes: 'mischievous', mouth: 'small', extras: ['blush'], effects: [], mood: 'joyful' } },
  { char: '🐢', name: 'Turtle', keywords: 'turtle slow chill shell', category: 'animals', traits: { base: 'green', eyes: 'sleepy', mouth: 'smile', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🦀', name: 'Crab', keywords: 'crab claws beach side', category: 'animals', traits: { base: 'red', eyes: 'frog', mouth: 'flat', extras: [], effects: [], mood: 'wild' } },
  { char: '🐳', name: 'Whale', keywords: 'whale ocean spout big sea', category: 'animals', traits: { base: 'blue', eyes: 'happy', mouth: 'grin', extras: ['steam'], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🦈', name: 'Shark', keywords: 'shark teeth jaws ocean danger', category: 'animals', traits: { base: 'blue', eyes: 'angry', mouth: 'dino', extras: [], effects: ['droplets'], mood: 'wild' } },
  { char: '🐺', name: 'Wolf', keywords: 'wolf howl moon wild', category: 'animals', traits: { base: 'ghost', eyes: 'angry', mouth: 'frown', extras: ['fox-ears'], effects: [], mood: 'wild' } },

  // ── Food (batch 2) ──────────────────────────────────────
  { char: '🍔', name: 'Burger', keywords: 'burger hamburger fastfood yummy', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: ['seeds'], effects: [], mood: 'joyful' } },
  { char: '🍓', name: 'Strawberry', keywords: 'strawberry berry sweet fruit', category: 'food', traits: { base: 'red', eyes: 'happy', mouth: 'smile', extras: ['seeds'], effects: [], mood: 'joyful' } },
  { char: '🍇', name: 'Grapes', keywords: 'grapes fruit wine purple', category: 'food', traits: { base: 'purple', eyes: 'happy', mouth: 'smile', extras: [], effects: ['droplets'], mood: 'joyful' } },
  { char: '🥑', name: 'Avocado', keywords: 'avocado toast green healthy', category: 'food', traits: { base: 'green', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍪', name: 'Cookie', keywords: 'cookie chocolate chips sweet', category: 'food', traits: { base: 'brown', eyes: 'happy', mouth: 'grin', extras: ['pepperoni'], effects: [], mood: 'joyful' } },
  { char: '🍰', name: 'Cake', keywords: 'cake slice dessert birthday', category: 'food', traits: { base: 'pink', eyes: 'starry', mouth: 'smile', extras: ['frosting', 'cherry'], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🍿', name: 'Popcorn', keywords: 'popcorn movie snack cinema', category: 'food', traits: { base: 'pale', eyes: 'starry', mouth: 'laugh-open', extras: [], effects: ['confetti'], mood: 'joyful' } },
  { char: '🧋', name: 'Boba tea', keywords: 'boba bubble tea milk milkshake', category: 'food', traits: { base: 'brown', eyes: 'happy', mouth: 'small', extras: [], effects: ['droplets'], mood: 'joyful' } },
  { char: '🍑', name: 'Peach', keywords: 'peach fruit juicy sweet', category: 'food', traits: { base: 'orange', eyes: 'happy', mouth: 'smile', extras: ['blush'], effects: [], mood: 'joyful' } },
  { char: '🥤', name: 'Soda', keywords: 'soda drink cup cola straw', category: 'food', traits: { base: 'red', eyes: 'happy', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'joyful' } },

  // ── Activities (batch 2) ────────────────────────────────
  { char: '⚾', name: 'Baseball', keywords: 'baseball sport ball game', category: 'activities', traits: { base: 'pale', eyes: 'happy', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🏀', name: 'Basketball', keywords: 'basketball sport hoop ball', category: 'activities', traits: { base: 'orange', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🎨', name: 'Art palette', keywords: 'art paint creative colors palette', category: 'activities', traits: { base: 'pale', eyes: 'starry', mouth: 'smile', extras: ['sprinkles'], effects: ['rainbow'], mood: 'dreamy' } },
  { char: '🎯', name: 'Bullseye', keywords: 'target bullseye aim direct hit', category: 'activities', traits: { base: 'red', eyes: 'surprised', mouth: 'amazed', extras: [], effects: [], mood: 'cool' } },
  { char: '🎲', name: 'Dice', keywords: 'dice gamble random luck game', category: 'activities', traits: { base: 'bone', eyes: 'surprised', mouth: 'grin', extras: [], effects: ['sparkles'], mood: 'wild' } },
  { char: '🪁', name: 'Kite', keywords: 'kite fly wind sky fun', category: 'activities', traits: { base: 'lavender', eyes: 'starry', mouth: 'smile', extras: [], effects: ['rainbow', 'sparkles'], mood: 'dreamy' } },
  { char: '🎪', name: 'Circus', keywords: 'circus tent carnival show', category: 'activities', traits: { base: 'red', eyes: 'starry', mouth: 'laugh-open', extras: ['star-top'], effects: ['confetti'], mood: 'joyful' } },
  { char: '🎸', name: 'Rock guitar', keywords: 'guitar rock music concert', category: 'activities', traits: { base: 'orange', eyes: 'cool', mouth: 'smirk', extras: ['shades'], effects: ['music'], mood: 'cool' } },

  // ── Travel (batch 2) ────────────────────────────────────
  { char: '🌋', name: 'Volcano', keywords: 'volcano lava eruption hot', category: 'travel', traits: { base: 'lava', eyes: 'angry', mouth: 'panting', extras: ['fire'], effects: ['flames'], mood: 'wild' } },
  { char: '☁️', name: 'Cloud', keywords: 'cloud cloudy sky soft', category: 'travel', traits: { base: 'ghost', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'dreamy' } },
  { char: '🌪️', name: 'Tornado', keywords: 'tornado storm twister spin', category: 'travel', traits: { base: 'blue', eyes: 'rolling', mouth: 'amazed', extras: ['swirl-face'], effects: [], mood: 'wild' } },
  { char: '🌠', name: 'Shooting star', keywords: 'shooting star wish night meteor', category: 'travel', traits: { base: 'midnight', eyes: 'starry', mouth: 'amazed', extras: [], effects: ['stars', 'sparkles'], mood: 'dreamy' } },
  { char: '🎈', name: 'Balloon', keywords: 'balloon party float birthday', category: 'travel', traits: { base: 'red', eyes: 'happy', mouth: 'laugh-open', extras: [], effects: ['confetti'], mood: 'joyful' } },
  { char: '🛸', name: 'UFO', keywords: 'ufo alien spaceship saucer abduct', category: 'travel', traits: { base: 'robot', eyes: 'alien', mouth: 'robot', extras: ['antennae'], effects: ['stars', 'lightning'], mood: 'mischievous' } },
  { char: '🌅', name: 'Sunrise', keywords: 'sunrise morning dawn sun', category: 'travel', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: ['rays'], effects: ['sparkles'], mood: 'joyful' } },

  // ── Objects (batch 2) ───────────────────────────────────
  { char: '🎀', name: 'Ribbon', keywords: 'bow ribbon cute gift pink', category: 'objects', traits: { base: 'pink', eyes: 'happy', mouth: 'smile', extras: ['bow', 'blush'], effects: ['sparkles'], mood: 'loving' } },
  { char: '👓', name: 'Glasses', keywords: 'glasses nerd smart specs', category: 'objects', traits: { base: 'pale', eyes: 'monocle', mouth: 'grin', extras: ['monocle'], effects: [], mood: 'cool' } },
  { char: '🧢', name: 'Cap', keywords: 'cap hat baseball cool', category: 'objects', traits: { base: 'blue', eyes: 'happy', mouth: 'smirk', extras: ['cap'], effects: [], mood: 'cool' } },
  { char: '💍', name: 'Ring', keywords: 'ring diamond wedding propose gem', category: 'objects', traits: { base: 'cyan', eyes: 'starry', mouth: 'smile', extras: ['facets'], effects: ['sparkles'], mood: 'royal' } },
  { char: '🔮', name: 'Crystal ball', keywords: 'crystal future fortune magic ball', category: 'objects', traits: { base: 'purple', eyes: 'third-eye-big', mouth: 'small', extras: ['third-eye'], effects: ['stars', 'sparkles'], mood: 'mischievous' } },
  { char: '🧲', name: 'Magnet', keywords: 'magnet attract science metal', category: 'objects', traits: { base: 'red', eyes: 'happy', mouth: 'grin', extras: [], effects: ['lightning'], mood: 'cool' } },
  { char: '🔔', name: 'Bell', keywords: 'bell ring notification chime', category: 'objects', traits: { base: 'gold', eyes: 'surprised', mouth: 'laugh-open', extras: [], effects: ['music'], mood: 'joyful' } },
  { char: '📦', name: 'Package', keywords: 'box package delivery parcel', category: 'objects', traits: { base: 'brown', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },

  // ── Symbols (batch 2) ───────────────────────────────────
  { char: '💔', name: 'Broken heart', keywords: 'heartbreak sad broken love', category: 'symbols', traits: { base: 'red', eyes: 'crying', mouth: 'frown', extras: ['tears-sad'], effects: [], mood: 'sad' } },
  { char: '💥', name: 'Boom', keywords: 'explosion boom pow bang', category: 'symbols', traits: { base: 'gold', eyes: 'surprised', mouth: 'amazed', extras: ['burst'], effects: ['stars', 'lightning'], mood: 'wild' } },
  { char: '💫', name: 'Dizzy star', keywords: 'dizzy star sparkle faint', category: 'symbols', traits: { base: 'gold', eyes: 'starry', mouth: 'amazed', extras: [], effects: ['stars', 'sparkles'], mood: 'dreamy' } },
  { char: '🖤', name: 'Black heart', keywords: 'black heart dark love', category: 'symbols', traits: { base: 'midnight', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💙', name: 'Blue heart', keywords: 'blue heart love trust', category: 'symbols', traits: { base: 'blue', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💚', name: 'Green heart', keywords: 'green heart love nature', category: 'symbols', traits: { base: 'green', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💜', name: 'Purple heart', keywords: 'purple heart love', category: 'symbols', traits: { base: 'purple', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💛', name: 'Yellow heart', keywords: 'yellow heart gold love happy', category: 'symbols', traits: { base: 'gold', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },

  // ── Smileys (batch 3) ───────────────────────────────────
  { char: '😊', name: 'Blushing smile', keywords: 'shy blush happy smile warm', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'smile', extras: ['blush'], effects: [], mood: 'loving' } },
  { char: '😃', name: 'Big grin', keywords: 'happy grin excited smile', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'laugh-open', extras: [], effects: [], mood: 'joyful' } },
  { char: '😁', name: 'Beaming grin', keywords: 'grin teeth happy excited', category: 'smileys', traits: { base: 'yellow', eyes: 'laughing', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '😉', name: 'Wink', keywords: 'wink flirt playful cheeky', category: 'smileys', traits: { base: 'yellow', eyes: 'wink', mouth: 'smile', extras: [], effects: [], mood: 'cool' } },
  { char: '😋', name: 'Yummy', keywords: 'yummy delicious tasty food', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'grin', extras: ['blush'], effects: [], mood: 'joyful' } },
  { char: '🤑', name: 'Money mouth', keywords: 'money rich cash greedy dollar', category: 'smileys', traits: { base: 'gold', eyes: 'starry', mouth: 'grin', extras: [], effects: ['sparkles'], mood: 'mischievous' } },
  { char: '🤗', name: 'Hug', keywords: 'hug embrace love warm cuddle', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'laugh-open', extras: ['blush'], effects: ['hearts'], mood: 'loving' } },
  { char: '🤭', name: 'Giggle', keywords: 'giggle oops shy laugh hand', category: 'smileys', traits: { base: 'yellow', eyes: 'laughing', mouth: 'smirk', extras: ['blush'], effects: [], mood: 'joyful' } },
  { char: '🫣', name: 'Peek', keywords: 'peek shy scared watch hiding', category: 'smileys', traits: { base: 'yellow', eyes: 'pleading', mouth: 'small', extras: ['blush'], effects: [], mood: 'dreamy' } },
  { char: '🤫', name: 'Shush', keywords: 'quiet secret shush silence', category: 'smileys', traits: { base: 'yellow', eyes: 'wink', mouth: 'flat', extras: [], effects: [], mood: 'mischievous' } },
  { char: '😪', name: 'Sleepy drool', keywords: 'sleepy tired drool nap', category: 'smileys', traits: { base: 'yellow', eyes: 'sleepy', mouth: 'sleep', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🥱', name: 'Yawn', keywords: 'yawn tired bored sleepy', category: 'smileys', traits: { base: 'yellow', eyes: 'sleepy', mouth: 'amazed', extras: [], effects: ['zzz'], mood: 'dreamy' } },
  { char: '😮‍💨', name: 'Exhale', keywords: 'sigh relief exhale breath', category: 'smileys', traits: { base: 'yellow', eyes: 'tired', mouth: 'flat', extras: ['steam'], effects: [], mood: 'dreamy' } },
  { char: '😢', name: 'Single tear', keywords: 'cry tear sad emotional', category: 'smileys', traits: { base: 'yellow', eyes: 'crying', mouth: 'frown', extras: ['tears-sad'], effects: [], mood: 'sad' } },
  { char: '😥', name: 'Sad sweat', keywords: 'sad disappointed sweat relief', category: 'smileys', traits: { base: 'yellow', eyes: 'tired', mouth: 'frown', extras: ['sweat'], effects: [], mood: 'sad' } },
  { char: '😰', name: 'Anxious sweat', keywords: 'anxious nervous worried sweat', category: 'smileys', traits: { base: 'blue', eyes: 'surprised', mouth: 'frown', extras: ['sweat'], effects: [], mood: 'dreamy' } },
  { char: '😨', name: 'Fearful', keywords: 'scared fear nervous shock', category: 'smileys', traits: { base: 'pale', eyes: 'surprised', mouth: 'cry-open', extras: ['sweat'], effects: [], mood: 'wild' } },
  { char: '😱', name: 'Scream', keywords: 'scream shock horror omg', category: 'smileys', traits: { base: 'pale', eyes: 'surprised', mouth: 'cry-open', extras: [], effects: ['lightning'], mood: 'wild' } },
  { char: '🤤', name: 'Drooling', keywords: 'drool hungry want food', category: 'smileys', traits: { base: 'yellow', eyes: 'starry', mouth: 'grin', extras: [], effects: ['droplets'], mood: 'joyful' } },
  { char: '🤓', name: 'Nerd', keywords: 'nerd geek smart glasses', category: 'smileys', traits: { base: 'yellow', eyes: 'happy', mouth: 'grin', extras: ['monocle'], effects: [], mood: 'cool' } },

  // ── People (batch 3) ────────────────────────────────────
  { char: '🤵', name: 'Tuxedo', keywords: 'tuxedo suit wedding fancy groom', category: 'people', traits: { base: 'pale', eyes: 'happy', mouth: 'smirk', extras: ['bow'], effects: ['sparkles'], mood: 'royal' } },
  { char: '👰', name: 'Bride', keywords: 'bride wedding veil love', category: 'people', traits: { base: 'pink', eyes: 'happy', mouth: 'smile', extras: ['blush'], effects: ['hearts', 'sparkles'], mood: 'loving' } },
  { char: '🧓', name: 'Elder', keywords: 'old grandpa wise elder', category: 'people', traits: { base: 'pale', eyes: 'tired', mouth: 'smile', extras: ['beard'], effects: [], mood: 'dreamy' } },
  { char: '🧔', name: 'Bearded', keywords: 'beard hipster man facial hair', category: 'people', traits: { base: 'brown', eyes: 'happy', mouth: 'smile', extras: ['beard'], effects: [], mood: 'cool' } },
  { char: '👼', name: 'Baby angel', keywords: 'baby angel cherub cute', category: 'people', traits: { base: 'pale', eyes: 'sleepy', mouth: 'small', extras: ['halo'], effects: ['sparkles', 'hearts'], mood: 'dreamy' } },
  { char: '🦹', name: 'Supervillain', keywords: 'villain evil bad cape', category: 'people', traits: { base: 'purple', eyes: 'devil', mouth: 'smirk', extras: [], effects: ['lightning'], mood: 'mischievous' } },
  { char: '🧝', name: 'Elf', keywords: 'elf fantasy archer magic', category: 'people', traits: { base: 'pale', eyes: 'starry', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'dreamy' } },
  { char: '🧞', name: 'Genie', keywords: 'genie lamp wish magic', category: 'people', traits: { base: 'cyan', eyes: 'mischievous', mouth: 'smirk', extras: [], effects: ['sparkles', 'stars'], mood: 'mischievous' } },
  { char: '🫅', name: 'Crowned person', keywords: 'crown royal person king', category: 'people', traits: { base: 'gold', eyes: 'happy', mouth: 'smile', extras: ['crown'], effects: ['sparkles'], mood: 'royal' } },
  { char: '💂', name: 'Guard', keywords: 'guard soldier british royal', category: 'people', traits: { base: 'red', eyes: 'happy', mouth: 'flat', extras: ['cap'], effects: [], mood: 'cool' } },

  // ── Animals (batch 3) ───────────────────────────────────
  { char: '🐭', name: 'Mouse', keywords: 'mouse cute tiny squeak', category: 'animals', traits: { base: 'ghost', eyes: 'happy', mouth: 'small', extras: ['bear-ears'], effects: [], mood: 'joyful' } },
  { char: '🐹', name: 'Hamster', keywords: 'hamster cute cheeks pet', category: 'animals', traits: { base: 'orange', eyes: 'happy', mouth: 'small', extras: ['bear-ears', 'blush'], effects: [], mood: 'joyful' } },
  { char: '🦔', name: 'Hedgehog', keywords: 'hedgehog spiky cute sonic', category: 'animals', traits: { base: 'brown', eyes: 'happy', mouth: 'small', extras: ['spikes'], effects: [], mood: 'joyful' } },
  { char: '🦇', name: 'Bat', keywords: 'bat vampire night spooky', category: 'animals', traits: { base: 'midnight', eyes: 'happy', mouth: 'grin', extras: [], effects: ['stars'], mood: 'mischievous' } },
  { char: '🦅', name: 'Eagle', keywords: 'eagle bird freedom sharp', category: 'animals', traits: { base: 'brown', eyes: 'angry', mouth: 'frown', extras: [], effects: [], mood: 'wild' } },
  { char: '🦆', name: 'Duck', keywords: 'duck quack bird pond', category: 'animals', traits: { base: 'gold', eyes: 'happy', mouth: 'small', extras: [], effects: ['droplets'], mood: 'joyful' } },
  { char: '🐍', name: 'Snake', keywords: 'snake sly hiss reptile', category: 'animals', traits: { base: 'green', eyes: 'mischievous', mouth: 'smirk', extras: [], effects: [], mood: 'mischievous' } },
  { char: '🦎', name: 'Lizard', keywords: 'lizard gecko reptile', category: 'animals', traits: { base: 'green', eyes: 'frog', mouth: 'frog-smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🐠', name: 'Tropical fish', keywords: 'fish tropical clownfish sea', category: 'animals', traits: { base: 'orange', eyes: 'happy', mouth: 'small', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🐟', name: 'Fish', keywords: 'fish sea swim ocean', category: 'animals', traits: { base: 'blue', eyes: 'happy', mouth: 'small', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🐡', name: 'Blowfish', keywords: 'blowfish puffer round sea', category: 'animals', traits: { base: 'gold', eyes: 'surprised', mouth: 'amazed', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🦐', name: 'Shrimp', keywords: 'shrimp prawn seafood tiny', category: 'animals', traits: { base: 'pink', eyes: 'happy', mouth: 'small', extras: [], effects: [], mood: 'joyful' } },
  { char: '🐌', name: 'Snail', keywords: 'snail slow shell slime', category: 'animals', traits: { base: 'green', eyes: 'frog', mouth: 'smile', extras: [], effects: [], mood: 'dreamy' } },
  { char: '🦋', name: 'Butterfly', keywords: 'butterfly wings pretty fly', category: 'animals', traits: { base: 'lavender', eyes: 'happy', mouth: 'smile', extras: ['bee-wings'], effects: ['sparkles'], mood: 'dreamy' } },
  { char: '🐞', name: 'Ladybug', keywords: 'ladybug beetle spots luck', category: 'animals', traits: { base: 'red', eyes: 'happy', mouth: 'smile', extras: ['seeds'], effects: [], mood: 'joyful' } },
  { char: '🕷️', name: 'Spider', keywords: 'spider web creepy crawly', category: 'animals', traits: { base: 'midnight', eyes: 'surprised', mouth: 'small', extras: [], effects: [], mood: 'mischievous' } },

  // ── Food (batch 3) ──────────────────────────────────────
  { char: '🥐', name: 'Croissant', keywords: 'croissant french breakfast pastry', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'smile', extras: ['steam'], effects: [], mood: 'joyful' } },
  { char: '🥞', name: 'Pancakes', keywords: 'pancakes breakfast syrup morning', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: ['cherry'], effects: [], mood: 'joyful' } },
  { char: '🧇', name: 'Waffle', keywords: 'waffle breakfast crispy sweet', category: 'food', traits: { base: 'brown', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🌭', name: 'Hot dog', keywords: 'hotdog sausage fastfood', category: 'food', traits: { base: 'orange', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🌮', name: 'Taco', keywords: 'taco mexican spicy yummy', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: ['seeds'], effects: [], mood: 'joyful' } },
  { char: '🍣', name: 'Sushi', keywords: 'sushi japanese fish rice', category: 'food', traits: { base: 'orange', eyes: 'happy', mouth: 'small', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍜', name: 'Ramen', keywords: 'ramen noodles soup hot japanese', category: 'food', traits: { base: 'red', eyes: 'happy', mouth: 'grin', extras: ['steam'], effects: [], mood: 'joyful' } },
  { char: '🥗', name: 'Salad', keywords: 'salad healthy green fresh', category: 'food', traits: { base: 'green', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍎', name: 'Apple', keywords: 'apple fruit red healthy', category: 'food', traits: { base: 'red', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍊', name: 'Orange', keywords: 'orange citrus fruit vitamin', category: 'food', traits: { base: 'orange', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍋', name: 'Lemon', keywords: 'lemon sour citrus bitter', category: 'food', traits: { base: 'gold', eyes: 'surprised', mouth: 'frown', extras: [], effects: [], mood: 'wild' } },
  { char: '🍌', name: 'Banana', keywords: 'banana fruit potassium monkey', category: 'food', traits: { base: 'gold', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🫐', name: 'Blueberries', keywords: 'blueberry berries fruit', category: 'food', traits: { base: 'blue', eyes: 'happy', mouth: 'small', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍫', name: 'Chocolate', keywords: 'chocolate sweet candy bar', category: 'food', traits: { base: 'brown', eyes: 'starry', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🍬', name: 'Candy', keywords: 'candy sweet sugar treat', category: 'food', traits: { base: 'pink', eyes: 'starry', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🍭', name: 'Lollipop', keywords: 'lollipop candy sweet pop', category: 'food', traits: { base: 'pink', eyes: 'starry', mouth: 'small', extras: [], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🧃', name: 'Juice box', keywords: 'juice drink box kids', category: 'food', traits: { base: 'orange', eyes: 'happy', mouth: 'small', extras: [], effects: [], mood: 'joyful' } },
  { char: '🥛', name: 'Milk', keywords: 'milk glass white drink', category: 'food', traits: { base: 'ghost', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },

  // ── Activities (batch 3) ────────────────────────────────
  { char: '🏈', name: 'Football', keywords: 'football american sport ball', category: 'activities', traits: { base: 'brown', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🥊', name: 'Boxing glove', keywords: 'boxing fight glove punch', category: 'activities', traits: { base: 'red', eyes: 'angry', mouth: 'flat', extras: [], effects: [], mood: 'wild' } },
  { char: '🎱', name: '8 ball', keywords: 'pool 8ball billiards magic ball', category: 'activities', traits: { base: 'midnight', eyes: 'surprised', mouth: 'small', extras: [], effects: ['sparkles'], mood: 'cool' } },
  { char: '🏆', name: 'Trophy', keywords: 'trophy winner champion gold', category: 'activities', traits: { base: 'gold', eyes: 'starry', mouth: 'grin', extras: [], effects: ['sparkles', 'confetti'], mood: 'joyful' } },
  { char: '🎺', name: 'Trumpet', keywords: 'trumpet jazz music brass', category: 'activities', traits: { base: 'gold', eyes: 'happy', mouth: 'amazed', extras: [], effects: ['music'], mood: 'cool' } },
  { char: '🎷', name: 'Saxophone', keywords: 'sax jazz music smooth', category: 'activities', traits: { base: 'gold', eyes: 'cool', mouth: 'small', extras: ['shades'], effects: ['music'], mood: 'cool' } },
  { char: '🥁', name: 'Drum', keywords: 'drum beat music rhythm', category: 'activities', traits: { base: 'red', eyes: 'happy', mouth: 'grin', extras: [], effects: ['music'], mood: 'joyful' } },
  { char: '🎤', name: 'Microphone', keywords: 'mic sing karaoke sing singer', category: 'activities', traits: { base: 'pale', eyes: 'surprised', mouth: 'laugh-open', extras: [], effects: ['music'], mood: 'cool' } },

  // ── Travel (batch 3) ────────────────────────────────────
  { char: '🚗', name: 'Car', keywords: 'car drive road trip', category: 'travel', traits: { base: 'red', eyes: 'happy', mouth: 'smile', extras: [], effects: [], mood: 'joyful' } },
  { char: '🏎️', name: 'Race car', keywords: 'race fast formula speed', category: 'travel', traits: { base: 'red', eyes: 'fiery', mouth: 'grin', extras: [], effects: ['flames'], mood: 'wild' } },
  { char: '✈️', name: 'Airplane', keywords: 'plane fly travel vacation', category: 'travel', traits: { base: 'pale', eyes: 'happy', mouth: 'grin', extras: [], effects: ['sparkles'], mood: 'joyful' } },
  { char: '⛵', name: 'Sailboat', keywords: 'boat sail sea sailboat', category: 'travel', traits: { base: 'pale', eyes: 'happy', mouth: 'smile', extras: [], effects: ['droplets'], mood: 'dreamy' } },
  { char: '🪂', name: 'Parachute', keywords: 'parachute skydive jump fall', category: 'travel', traits: { base: 'red', eyes: 'surprised', mouth: 'smile', extras: [], effects: [], mood: 'wild' } },
  { char: '🚲', name: 'Bicycle', keywords: 'bike cycle ride bicycle', category: 'travel', traits: { base: 'blue', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'joyful' } },
  { char: '🛹', name: 'Skateboard', keywords: 'skate cool board trick', category: 'travel', traits: { base: 'brown', eyes: 'cool', mouth: 'smirk', extras: ['shades'], effects: [], mood: 'cool' } },
  { char: '🗽', name: 'Liberty', keywords: 'statue liberty new york freedom', category: 'travel', traits: { base: 'green', eyes: 'happy', mouth: 'smile', extras: ['crown'], effects: ['sparkles'], mood: 'dreamy' } },

  // ── Objects (batch 3) ───────────────────────────────────
  { char: '⌚', name: 'Watch', keywords: 'watch time wrist clock', category: 'objects', traits: { base: 'gold', eyes: 'happy', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'cool' } },
  { char: '📱', name: 'Phone', keywords: 'phone mobile smartphone', category: 'objects', traits: { base: 'blue', eyes: 'happy', mouth: 'grin', extras: [], effects: [], mood: 'cool' } },
  { char: '💻', name: 'Laptop', keywords: 'laptop computer code work', category: 'objects', traits: { base: 'ghost', eyes: 'happy', mouth: 'grin', extras: [], effects: ['sparkles'], mood: 'cool' } },
  { char: '📷', name: 'Camera', keywords: 'camera photo picture lens', category: 'objects', traits: { base: 'pale', eyes: 'surprised', mouth: 'small', extras: [], effects: [], mood: 'cool' } },
  { char: '🔍', name: 'Magnifier', keywords: 'search zoom find detective', category: 'objects', traits: { base: 'pale', eyes: 'surprised', mouth: 'small', extras: ['monocle'], effects: [], mood: 'cool' } },
  { char: '🪙', name: 'Coin', keywords: 'coin money gold rich', category: 'objects', traits: { base: 'gold', eyes: 'happy', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'cool' } },
  { char: '💰', name: 'Money bag', keywords: 'money bag rich cash dollar', category: 'objects', traits: { base: 'brown', eyes: 'starry', mouth: 'grin', extras: [], effects: ['sparkles'], mood: 'joyful' } },
  { char: '🔨', name: 'Hammer', keywords: 'hammer build tool fix', category: 'objects', traits: { base: 'brown', eyes: 'angry', mouth: 'flat', extras: [], effects: [], mood: 'wild' } },
  { char: '⚙️', name: 'Gear', keywords: 'gear settings machine work', category: 'objects', traits: { base: 'robot', eyes: 'surprised', mouth: 'robot', extras: [], effects: [], mood: 'cool' } },
  { char: '🪞', name: 'Mirror', keywords: 'mirror reflect beauty look', category: 'objects', traits: { base: 'cyan', eyes: 'starry', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'dreamy' } },
  { char: '🧼', name: 'Soap', keywords: 'soap clean wash bubbles', category: 'objects', traits: { base: 'cyan', eyes: 'happy', mouth: 'smile', extras: [], effects: ['droplets', 'sparkles'], mood: 'joyful' } },
  { char: '🎊', name: 'Confetti popper', keywords: 'confetti party celebrate popper', category: 'objects', traits: { base: 'gold', eyes: 'starry', mouth: 'laugh-open', extras: [], effects: ['confetti'], mood: 'joyful' } },
  { char: '🧿', name: 'Nazar amulet', keywords: 'evil eye amulet protect nazar', category: 'objects', traits: { base: 'cyan', eyes: 'third-eye-big', mouth: 'small', extras: [], effects: ['sparkles'], mood: 'mischievous' } },

  // ── Symbols (batch 3) ───────────────────────────────────
  { char: '❤️‍🔥', name: 'Heart on fire', keywords: 'burning love passion fire heart', category: 'symbols', traits: { base: 'lava', eyes: 'hearts', mouth: 'kiss', extras: ['fire'], effects: ['flames', 'hearts'], mood: 'loving' } },
  { char: '❤️‍🩹', name: 'Mending heart', keywords: 'healing heart recover bandage', category: 'symbols', traits: { base: 'pink', eyes: 'pleading', mouth: 'smile', extras: ['blush'], effects: ['hearts'], mood: 'loving' } },
  { char: '💘', name: 'Heart arrow', keywords: 'cupid arrow love struck', category: 'symbols', traits: { base: 'pink', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💝', name: 'Gift heart', keywords: 'gift heart ribbon love present', category: 'symbols', traits: { base: 'pink', eyes: 'hearts', mouth: 'smile', extras: ['bow'], effects: ['hearts'], mood: 'loving' } },
  { char: '💖', name: 'Sparkling heart', keywords: 'sparkling heart shine love', category: 'symbols', traits: { base: 'pink', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts', 'sparkles'], mood: 'loving' } },
  { char: '🩷', name: 'Pink heart', keywords: 'pink heart cute love', category: 'symbols', traits: { base: 'pink', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '🩵', name: 'Light blue heart', keywords: 'light blue heart calm love', category: 'symbols', traits: { base: 'cyan', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '🩶', name: 'Gray heart', keywords: 'gray grey heart neutral', category: 'symbols', traits: { base: 'ghost', eyes: 'hearts', mouth: 'kiss', extras: [], effects: ['hearts'], mood: 'loving' } },
  { char: '💢', name: 'Anger mark', keywords: 'angry rage mad symbol', category: 'symbols', traits: { base: 'red', eyes: 'angry', mouth: 'frown', extras: [], effects: ['flames'], mood: 'wild' } },
  { char: '🌟', name: 'Glowing star', keywords: 'glowing star shine bright', category: 'symbols', traits: { base: 'gold', eyes: 'starry', mouth: 'smile', extras: [], effects: ['stars', 'sparkles'], mood: 'dreamy' } },
  { char: '⏰', name: 'Alarm clock', keywords: 'alarm morning wake time', category: 'symbols', traits: { base: 'gold', eyes: 'surprised', mouth: 'amazed', extras: [], effects: ['music'], mood: 'joyful' } },
  { char: '🃏', name: 'Joker card', keywords: 'joker card wild game funny', category: 'symbols', traits: { base: 'pale', eyes: 'starry', mouth: 'grin', extras: ['rainbow-hair'], effects: ['confetti'], mood: 'wild' } },
  { char: '💭', name: 'Thought bubble', keywords: 'think dream thought imagine', category: 'symbols', traits: { base: 'lavender', eyes: 'sleepy', mouth: 'small', extras: [], effects: ['zzz'], mood: 'dreamy' } },
  { char: '☯️', name: 'Yin yang', keywords: 'balance harmony zen yinyang', category: 'symbols', traits: { base: 'blend', eyes: 'happy', mouth: 'smile', extras: [], effects: ['sparkles'], mood: 'dreamy' } },
];

export const EMOJI_MAP = Object.fromEntries(EMOJIS.map((e) => [e.char, e]));

export function getEmoji(char) {
  return EMOJI_MAP[char] || null;
}

export function searchEmojis(query) {
  const q = query.trim().toLowerCase();
  if (!q) return EMOJIS;
  return EMOJIS.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.keywords.includes(q) ||
      e.char.includes(q)
  );
}

export function emojisByCategory(categoryId) {
  return EMOJIS.filter((e) => e.category === categoryId);
}

export function randomEmoji(except = []) {
  const pool = EMOJIS.filter((e) => !except.includes(e.char));
  return pool[Math.floor(Math.random() * pool.length)];
}
