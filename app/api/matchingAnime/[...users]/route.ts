import { NextApiRequest } from 'next';

export type AnimeListEntries = {
	media: {
		id: number;
		title: {
			romaji: string;
			english: string;
		};
		genres: string[];
		averageScore: number;
		siteUrl: string;
		status: string;
		coverImage: {
			medium: string;
		};
	};
};

type MediaListCollection = {
	lists: {
		entries: AnimeListEntries[];
	}[];
};

type Response = {
	data: {
		MediaListCollection: MediaListCollection;
	};
};

export async function GET(
	request: NextApiRequest,
	{ params }: { params: { users: string[] } }
) {
	const { users } = params;

	if (users.length !== 2) {
		return new Response('Must provide two users', { status: 400 });
	}

	const [user1, user2] = await Promise.all<Response>(
		users.map(user =>
			fetch('https://graphql.anilist.co', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						query ($userName: String) {
							MediaListCollection(userName: $userName, type: ANIME, status: PLANNING) {
								lists {
									entries {
										media {
											id
											title {
												romaji
												english
											}
											genres
											averageScore
											siteUrl
											status
											coverImage {
												medium
											}
										}
									}
								}
							}
						}
					`,
					variables: {
						userName: user,
					},
				}),
			}).then(res => res.json())
		)
	);

	if (user1.data.MediaListCollection === null) {
		return new Response(`User ${users[0]} not found`, { status: 404 });
	}

	if (user2.data.MediaListCollection === null) {
		return new Response(`User ${users[1]} not found`, { status: 404 });
	}

	const user1Finished = filterFinishedAnime(user1.data.MediaListCollection);
	const user2Finished = filterFinishedAnime(user2.data.MediaListCollection);

	const matchingAnime = getMatchingAnime(user1Finished, user2Finished);

	const matching = {
		animeList: matchingAnime,
		animeCount: matchingAnime.length,
	};

	return new Response(JSON.stringify(matching));
}

function filterFinishedAnime(list: MediaListCollection) {
	return list.lists[0].entries.filter(
		({ media }) => media.status === 'FINISHED'
	);
}

function getMatchingAnime(
	user1: AnimeListEntries[],
	user2: AnimeListEntries[]
) {
	return user1.filter(({ media: { id } }) =>
		user2.some(({ media: { id: id2 } }) => id === id2)
	);
}
