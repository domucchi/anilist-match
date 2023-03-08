import { useEffect, useState } from 'react';
import { AnimeListEntries } from '../api/matchingAnime/[...users]/route';

type Props = {
	user1: string;
	user2: string;
};

export const MatchingAnimeList = ({ user1, user2 }: Props) => {
	const [animeList, setAnimeList] = useState<AnimeListEntries[]>([]);
	const [count, setCount] = useState(0);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAnimeList = async () => {
			try {
				const res = await fetch(`/api/matchingAnime/${user1}/${user2}/`);
				const data = await res.json();
				setAnimeList(data.animeList);
				setCount(data.animeCount);
				setLoading(false);
				setError(false);
			} catch (err) {
				setError(true);
			}
		};
		fetchAnimeList();
	}, [user1, user2]);

	if (error) return <div>ERROR</div>;
	if (!animeList && loading) return <div>LOADING</div>;

	return (
		<div>
			<p className='text-center py-4'>Found {count} matches!</p>
			<div className='grid grid-cols-3 px-4'>
				{animeList.map((anime: AnimeListEntries) => (
					<div key={anime.media.id} className='p-4'>
						<a
							href={anime.media.siteUrl}
							target='_blank'
							className='flex justify-between flex-col gap-4 hover:text-blue-400'
						>
							<div className='flex align-center justify-center'>
								<img src={anime.media.coverImage.medium} alt='img' />
							</div>
							<div>
								<p className='text-center font-bold'>
									{!!anime.media.title.english
										? anime.media.title.english
										: anime.media.title.romaji}
								</p>
								<p className='text-center text-sm'>
									{anime.media.averageScore}%
								</p>
								<p className='text-center text-sm'>
									{anime.media.genres.join(', ')}
								</p>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};
