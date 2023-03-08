'use client';

import { useState } from 'react';
import { FormComponent } from './Form';
import { MatchingAnimeList } from './MatchingAnimeList';

export const Match = () => {
	const [user1, setUser1] = useState('');
	const [user2, setUser2] = useState('');

	const formSubmit = (user1: string, user2: string) => {
		setUser1(user1);
		setUser2(user2);
	};

	const validUsers =
		user1 && user2 && user1 !== user2 && user1 !== '' && user2 !== '';

	return (
		<>
			<FormComponent formSubmit={formSubmit} />
			{validUsers && <MatchingAnimeList user1={user1} user2={user2} />}
		</>
	);
};
