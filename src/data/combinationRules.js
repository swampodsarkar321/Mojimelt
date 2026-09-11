// ── Mojimelt original combination rules ─────────────────────────────────────
// Curated art-direction rules for popular pairs. Everything else falls back
// to the generative blender in utils/mixer.js.

export function ruleKey(a, b) {
  return [a, b].sort().join('‖');
}

const R = (a, b, title, blurb, spec) => ({ key: ruleKey(a, b), a, b, title, blurb, spec });

export const COMBINATION_RULES = [
  R('😂', '😈', 'Laughing Devil', 'Unholy giggles with tiny horns and mischief.', {
    base: 'lava', eyes: 'laughing', mouth: 'laugh-open', extras: ['horns', 'tears-happy'], effects: ['flames', 'droplets'],
  }),
  R('🔥', '👽', 'Fire Alien', 'A cosmic visitor that runs a little too hot.', {
    base: 'lava', eyes: 'alien', mouth: 'grin', extras: ['antennae', 'fire'], effects: ['flames', 'stars'],
  }),
  R('😭', '😎', 'Cool Crier', 'Crying, but make it fashion.', {
    base: 'blue', eyes: 'cool', mouth: 'cry-open', extras: ['shades', 'tears-sad'], effects: ['droplets', 'sparkles'],
  }),
  R('🐸', '👑', 'Frog Prince', 'One royal kiss away from greatness.', {
    base: 'green', eyes: 'frog', mouth: 'frog-smile', extras: ['crown', 'blush'], effects: ['sparkles', 'hearts'],
  }),
  R('😴', '☕', 'Caffeinated Nap', 'Powered by espresso and denial.', {
    base: 'brown', eyes: 'sleepy', mouth: 'sleep', extras: ['steam'], effects: ['zzz'],
  }),
  R('🤖', '❤️', 'Lovebot', 'Runs on hugs and AA batteries.', {
    base: 'robot', eyes: 'hearts', mouth: 'robot', extras: ['antennae-metal'], effects: ['hearts', 'sparkles'],
  }),
  R('🥶', '😎', 'Frost Flex', 'Sub-zero with full confidence.', {
    base: 'ice', eyes: 'cool', mouth: 'smirk', extras: ['shades', 'ice'], effects: ['snow', 'sparkles'],
  }),
  R('😇', '😈', 'Moral Conflict', 'Half halo, half horns. Fully chaotic.', {
    base: 'split-angel-devil', eyes: 'devil', mouth: 'smirk', extras: ['horns', 'halo'], effects: ['sparkles', 'flames'],
  }),
  R('🦄', '💩', 'Magical Mess', 'Rainbow-powered and proud of it.', {
    base: 'poop', eyes: 'starry', mouth: 'grin', extras: ['unicorn-horn', 'mane-rainbow'], effects: ['rainbow', 'sparkles'],
  }),
  R('🐱', '🍩', 'Donut Cat', 'Glazed, confused, adorable.', {
    base: 'donut', eyes: 'happy', mouth: 'cat', extras: ['cat-ears', 'whiskers', 'sprinkles'], effects: ['sparkles'],
  }),
  R('👻', '🎃', 'Spooky Duo', 'Maximum Halloween energy.', {
    base: 'orange', eyes: 'surprised', mouth: 'dino', extras: ['stem'], effects: ['sparkles', 'flames'],
  }),
  R('🤡', '👽', 'Space Clown', 'Beams down laughs across the galaxy.', {
    base: 'alien', eyes: 'starry', mouth: 'clown', extras: ['clown-nose', 'antennae'], effects: ['stars', 'confetti'],
  }),
  R('🥳', '🤖', 'Party Bot', 'Deploys confetti at 120 BPM.', {
    base: 'robot', eyes: 'happy', mouth: 'laugh-open', extras: ['party', 'antennae-metal'], effects: ['confetti'],
  }),
  R('🦊', '🔥', 'Hot Fox', 'Sly, smug and slightly singed.', {
    base: 'lava', eyes: 'mischievous', mouth: 'smirk', extras: ['fox-ears', 'fire'], effects: ['flames'],
  }),
  R('🐼', '🍕', 'Panda Slice', 'Round, cheesy and dangerously huggable.', {
    base: 'panda', eyes: 'happy', mouth: 'grin', extras: ['panda-ears', 'pepperoni'], effects: [],
  }),
  R('🧁', '🦄', 'Cupcake Corn', 'Frosted fantasy with a cherry on top.', {
    base: 'pink', eyes: 'starry', mouth: 'smile', extras: ['unicorn-horn', 'frosting', 'cherry', 'mane-rainbow'], effects: ['rainbow', 'sparkles'],
  }),
  R('😤', '🌶️', 'Spice Rage', 'Do not approach before lunch.', {
    base: 'red', eyes: 'angry', mouth: 'panting', extras: ['steam', 'fire'], effects: ['flames'],
  }),
  R('🌙', '⭐', 'Starry Night', 'Sleepy moon dusted with stardust.', {
    base: 'midnight', eyes: 'sleepy', mouth: 'sleep', extras: [], effects: ['stars', 'zzz', 'sparkles'],
  }),
  R('🐝', '👑', 'Queen Bee', 'Her royal hive-ness.', {
    base: 'gold', eyes: 'happy', mouth: 'smile', extras: ['crown', 'bee-wings', 'antennae-bee'], effects: ['sparkles', 'hearts'],
  }),
  R('🦖', '🎄', 'Dino Noel', 'Rawr means Merry Christmas.', {
    base: 'green', eyes: 'starry', mouth: 'dino', extras: ['star-top', 'ornaments', 'spikes'], effects: ['snow', 'sparkles'],
  }),
  R('💀', '🎩', 'Dapper Death', 'Dressed to kill, literally.', {
    base: 'bone', eyes: 'skull', mouth: 'skull', extras: ['top-hat'], effects: ['sparkles'],
  }),
  R('😻', '🍕', 'Pepperoni Purr', 'Loves you extra cheesy.', {
    base: 'gold', eyes: 'hearts', mouth: 'cat', extras: ['cat-ears', 'whiskers', 'pepperoni'], effects: ['hearts'],
  }),
  R('🤯', '🚀', 'Brain Launch', 'Houston, we have an idea.', {
    base: 'pale', eyes: 'surprised', mouth: 'amazed', extras: ['burst', 'flame-jet'], effects: ['stars', 'lightning'],
  }),
  R('🐙', '🌊', 'Deep Hug', 'Eight arms, zero personal space.', {
    base: 'blue', eyes: 'happy', mouth: 'smile', extras: ['tentacles'], effects: ['droplets'],
  }),
  R('🎮', '👽', 'Alien Gamer', '360 no-scope from Mars.', {
    base: 'alien', eyes: 'alien', mouth: 'grin', extras: ['antennae', 'headset'], effects: ['stars', 'lightning'],
  }),
  R('🍦', '❄️', 'Brain Freeze', 'Cold, sweet, slightly regretful.', {
    base: 'ice', eyes: 'happy', mouth: 'smile', extras: ['cherry', 'ice'], effects: ['snow'],
  }),
  R('🧙', '🔥', 'Fire Wizard', 'Casts “extra crispy”.', {
    base: 'lava', eyes: 'mischievous', mouth: 'smirk', extras: ['wizard-hat', 'fire'], effects: ['flames', 'stars'],
  }),
  R('💎', '👑', 'Royal Gem', 'Certified 24-karat fabulous.', {
    base: 'cyan', eyes: 'starry', mouth: 'royal-smile', extras: ['crown', 'facets'], effects: ['sparkles'],
  }),
  R('🐸', '☕', 'Swamp Latte', 'Ribbit, but decaf.', {
    base: 'green', eyes: 'sleepy', mouth: 'frog-smile', extras: ['steam', 'blush'], effects: ['zzz'],
  }),
  R('😇', '🍩', 'Holy Glaze', 'Blessed with sprinkles.', {
    base: 'donut', eyes: 'happy', mouth: 'smile', extras: ['halo', 'sprinkles'], effects: ['sparkles'],
  }),
  R('🥺', '❤️', 'Ultimate Beg', 'Scientifically impossible to refuse.', {
    base: 'pink', eyes: 'pleading', mouth: 'small', extras: ['blush'], effects: ['hearts', 'sparkles'],
  }),
  R('💩', '🔥', 'Hot Mess', 'Literally flaming.', {
    base: 'poop', eyes: 'fiery', mouth: 'panting', extras: ['swirl', 'fire'], effects: ['flames'],
  }),
  R('🦁', '👑', 'True King', 'The mane event.', {
    base: 'orange', eyes: 'happy', mouth: 'grin', extras: ['mane', 'crown'], effects: ['sparkles'],
  }),
  R('👁️', '👽', 'Third Eye Alien', 'Sees all timelines at once.', {
    base: 'alien', eyes: 'alien', mouth: 'small', extras: ['antennae', 'third-eye'], effects: ['stars'],
  }),
  R('🎁', '🥳', 'Surprise Squared', 'Contains 200% more party.', {
    base: 'yellow', eyes: 'starry', mouth: 'laugh-open', extras: ['party', 'bow'], effects: ['confetti', 'sparkles'],
  }),
  R('🌈', '🦄', 'Double Rainbow', 'Maximum magic density achieved.', {
    base: 'lavender', eyes: 'starry', mouth: 'smile', extras: ['unicorn-horn', 'mane-rainbow'], effects: ['rainbow', 'sparkles', 'stars'],
  }),
  R('🐶', '👑', 'Puppy Prince', 'Good boy, your highness. Belly rubs are now law.', {
    base: 'brown', eyes: 'happy', mouth: 'grin', extras: ['dog-ears', 'crown'], effects: ['sparkles', 'hearts'],
  }),
  R('😍', '🦄', 'Lovestruck Unicorn', 'Cupid clearly outsourced to the fantasy department.', {
    base: 'pink', eyes: 'hearts', mouth: 'smile', extras: ['unicorn-horn', 'mane-rainbow', 'blush'], effects: ['rainbow', 'hearts'],
  }),
  R('🎅', '🥶', 'Frozen Santa', 'The sleigh broke down in a blizzard. He stayed jolly.', {
    base: 'ice', eyes: 'happy', mouth: 'laugh-open', extras: ['santa-hat', 'beard', 'ice'], effects: ['snow'],
  }),
  R('🐰', '🍦', 'Bunny Scoop', 'A fluffy sundae that hops away if you blink.', {
    base: 'ice', eyes: 'happy', mouth: 'cat', extras: ['bunny-ears', 'whiskers', 'cherry'], effects: ['snow'],
  }),
  R('🧛', '🌙', 'Midnight Bite', 'Only comes out when the moon is watching.', {
    base: 'midnight', eyes: 'devil', mouth: 'dino', extras: [], effects: ['stars', 'zzz'],
  }),
  R('🦸', '🔥', 'Captain Blaze', 'Fights crime. Causes small fires. Worth it.', {
    base: 'lava', eyes: 'cool', mouth: 'grin', extras: ['shades', 'fire'], effects: ['flames', 'lightning'],
  }),
  R('🐯', '🍩', 'Tiger Donut', 'Frosted predator. Hunted to near-cuteness.', {
    base: 'donut', eyes: 'happy', mouth: 'cat', extras: ['tiger-stripes', 'sprinkles', 'whiskers'], effects: ['sparkles'],
  }),
  R('💔', '🧁', 'Mendy Cake', 'Heartbreak tastes better with frosting.', {
    base: 'pink', eyes: 'pleading', mouth: 'smile', extras: ['frosting', 'cherry', 'blush'], effects: ['hearts'],
  }),
  R('🦈', '🌊', 'Shark Wave', 'Do NOT hug. Seriously. We checked.', {
    base: 'blue', eyes: 'angry', mouth: 'dino', extras: [], effects: ['droplets'],
  }),
  R('🥷', '🌙', 'Shadow Strike', 'You never saw it. It never saw you. Perfect.', {
    base: 'midnight', eyes: 'angry', mouth: 'flat', extras: [], effects: ['stars'],
  }),
  R('🤑', '💰', 'Money Magnet', 'Attracts cash and questionable decisions.', {
    base: 'gold', eyes: 'starry', mouth: 'grin', extras: [], effects: ['sparkles'],
  }),
  R('🐍', '🍎', 'Forbidden Snack', 'One bite and you understand everything.', {
    base: 'red', eyes: 'mischievous', mouth: 'smirk', extras: ['seeds'], effects: ['sparkles'],
  }),
  R('🧓', '☕', "Grandpa's Brew", 'Stories included at no extra charge.', {
    base: 'brown', eyes: 'sleepy', mouth: 'smile', extras: ['beard', 'steam'], effects: ['zzz'],
  }),
  R('🦇', '🌙', 'Night Shift', 'Clocked in at sunset. Mornings are a rumor.', {
    base: 'midnight', eyes: 'happy', mouth: 'grin', extras: [], effects: ['stars'],
  }),
  R('🤓', '💻', 'Code Nerd', 'It works on my machine. Shipped it anyway.', {
    base: 'robot', eyes: 'robot', mouth: 'grin', extras: ['monocle'], effects: ['lightning'],
  }),
  R('❤️‍🔥', '🌶️', 'Double Spicy', 'Warning label sold separately.', {
    base: 'lava', eyes: 'fiery', mouth: 'panting', extras: ['fire'], effects: ['flames', 'hearts'],
  }),
  R('🦋', '🌈', 'Flutterbow', 'Flaps once, paints the whole sky.', {
    base: 'lavender', eyes: 'starry', mouth: 'smile', extras: ['bee-wings', 'mane-rainbow'], effects: ['rainbow', 'sparkles'],
  }),
  R('🏆', '🥳', 'Champion Party', 'First place in having a good time.', {
    base: 'gold', eyes: 'starry', mouth: 'laugh-open', extras: ['party'], effects: ['confetti', 'sparkles'],
  }),
];

export const RULE_MAP = Object.fromEntries(COMBINATION_RULES.map((r) => [r.key, r]));

export function findRule(a, b) {
  return RULE_MAP[ruleKey(a, b)] || null;
}

export const POPULAR_MIXES = [
  { a: '😂', b: '😈' },
  { a: '🔥', b: '👽' },
  { a: '😭', b: '😎' },
  { a: '🐸', b: '👑' },
  { a: '😴', b: '☕' },
  { a: '🤖', b: '❤️' },
  { a: '🥶', b: '😎' },
  { a: '😇', b: '😈' },
  { a: '🦄', b: '💩' },
  { a: '🐱', b: '🍩' },
  { a: '👻', b: '🎃' },
  { a: '🧁', b: '🦄' },
  { a: '🐶', b: '👑' },
  { a: '😍', b: '🦄' },
  { a: '🎅', b: '🥶' },
  { a: '🦸', b: '🔥' },
  { a: '🐰', b: '🍦' },
  { a: '🦈', b: '🌊' },
];
