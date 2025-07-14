//Encouragement scripture logic
const verseBank = {
  soul: [
    "Psalm 46:10 – 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.'",
    "Romans 12:2 – 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.'",
    "Ezekiel 36:26 – 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.'",
    "Psalm 23:3 – 'He restores my soul. He leads me in paths of righteousness for his name’s sake.'",
    "Matthew 11:28-29 – 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.'",
    "3 John 1:2 – 'Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.'",
    "Galatians 5:22-23 – 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.'"],
  food: [
    "Matthew 4:4 – 'Jesus answered, “It is written: ‘Man shall not live on bread alone, but on every word that comes from the mouth of God.’”'",
    "Daniel 1:12 – 'Please test your servants for ten days: Give us nothing but vegetables to eat and water to drink.'",
    "John 6:35 – 'Then Jesus declared, “I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.”'",
    "Joel 2:12 – 'Even now,” declares the Lord, “return to me with all your heart, with fasting and weeping and mourning.”'",
    "Acts 13:2 – 'While they were worshiping the Lord and fasting, the Holy Spirit said, “Set apart for me Barnabas and Saul for the work to which I have called them.”'",
    "Isaiah 58:6 – 'Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?'",
    "1 Corinthians 10:31 – 'So whether you eat or drink or whatever you do, do it all for the glory of God.'"],
  prayer: [
      "James 5:16 – 'Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.'",
      "1 Thessalonians 5:17 – 'Pray continually.'",
      "Philippians 4:6 – 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'",
      "Matthew 6:6 – 'But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you.'",
      "Jeremiah 29:12 – 'Then you will call on me and come and pray to me, and I will listen to you.'",
      "Mark 11:24 – 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.'",
      "Romans 8:26 – 'In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans.'"
    ],
  worship: [
    "Psalm 150:6 – 'Let everything that has breath praise the Lord. Praise the Lord.'",
    "John 4:24 – 'God is spirit, and his worshipers must worship in the Spirit and in truth.'",
    "Hebrews 13:15 – 'Through Jesus, therefore, let us continually offer to God a sacrifice of praise—the fruit of lips that openly profess his name.'",
    "Psalm 100:2 – 'Worship the Lord with gladness; come before him with joyful songs.'",
    "Revelation 4:11 – 'You are worthy, our Lord and God, to receive glory and honor and power, for you created all things, and by your will they were created and have their being.'",
    "Romans 12:1 – 'Therefore, I urge you, brothers and sisters, in view of God’s mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.'",
    "Psalm 95:6 – 'Come, let us bow down in worship, let us kneel before the Lord our Maker;'"
  ],
  media: [
    "Colossians 3:2 – 'Set your minds on things above, not on earthly things.'",
    "Proverbs 4:23 – 'Above all else, guard your heart, for everything you do flows from it.'",
    "Psalm 101:3 – 'I will not look with approval on anything that is vile. I hate what faithless people do; I will have no part in it.'",
    "Romans 13:14 – 'Rather, clothe yourselves with the Lord Jesus Christ, and do not think about how to gratify the desires of the flesh.'",
    "1 Corinthians 6:12 – '“I have the right to do anything,” you say—but not everything is beneficial. “I have the right to do anything”—but I will not be mastered by anything.'",
    "Matthew 6:22-23 – 'The eye is the lamp of the body. If your eyes are healthy, your whole body will be full of light. But if your eyes are unhealthy, your whole body will be full of darkness.'",
    "Philippians 4:8 – 'Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.'"
  ],
  custom: [
    "Isaiah 40:31 – 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'",
    "Psalm 37:4 – 'Take delight in the Lord, and he will give you the desires of your heart.'",
    "2 Corinthians 12:9 – 'But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.'",
    "Proverbs 16:3 – 'Commit to the Lord whatever you do, and he will establish your plans.'",
    "Joshua 1:9 – 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.'",
    "Lamentations 3:22-23 – 'Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.'",
    "Psalm 34:18 – 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.'"]
}