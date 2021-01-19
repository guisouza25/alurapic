export interface Photo { //interface que define a estrutura do objeto photo

	id: number;
	postDate: Date;
	url: string;
	description: string;
	allowComments: boolean;
	likes: number;
	comments: number;
	userId: number;

}