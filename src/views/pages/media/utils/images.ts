const images = [
  // "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/269279533_1082948809122107_2670360625570628598_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=825194&_nc_ohc=2cY5P0ky5CUAX-UXA1D&_nc_oc=AQlhbFC_kaw-U1FDA2Ea-pEOWsoSeYJjEuRBHRypuZXy8LkWUHXxylIzjNZ7jzXzAk8&tn=jaFjrZKldeYk49hA&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT_1O22yGh1AR6zbvLG_ZpN2e3tbJdDDl3XldIku6fKaXQ&oe=61C6FDD1",
	// "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/260358394_600589891204596_6653595986159359066_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=825194&_nc_ohc=TpZvvaZiEs8AX8DLM0C&tn=jaFjrZKldeYk49hA&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT_XcdpFXJDnWQibDTFk2eoR47bWepiI6IVLR6riqboLvw&oe=61C6C102",
	// "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/268804873_1454163268312759_2577302653439084797_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=825194&_nc_ohc=MSMM0OKy8qUAX_t4acB&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT9Z-wcH_LC-yQ5GKkrQFk2exMzbtregbVJ6L4DjJGuAIQ&oe=61C58E3C",
	// "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/240829952_361126782388952_1999698863280777746_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=825194&_nc_ohc=KXgWxeh7MtgAX9Zyaor&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT-UeO_rMcUvghHojhmVCizh_GwLllroleKwRJGkjze-2g&oe=61C69590",
	"https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/77e6bcf0-e750-4310-ad4e-47e521217888.jpeg",
	"https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/71c52b2e-5e71-4954-ba32-476b3619d893.jpeg",
	"https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/9eb780e6-1013-41c2-866d-c93de5b937b6.jpeg",
	"https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/cae575bc-4a4b-47a9-86a5-ac35fd93e9cb.jpg",
	"https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/3d049844-5477-4cb0-9333-f3a0cd5fae59.jpeg",
];

const generateImageLink = (): string => {
  return images[Math.floor(Math.random() * images.length)];
};

export default generateImageLink;

export { images };
