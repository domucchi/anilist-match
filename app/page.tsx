import { FormComponent } from './components/Form';
import { Match } from './components/Match';

export default function Home() {
	return (
		<>
			<header className='px-8 py-4'>
				<div className='p-4 flex justify-center align-center flex-col'>
					<h1 className='text-4xl text-center'>AniList Match (PoC)</h1>
					<p className='text-xl text-center'>Find your next anime match!</p>
				</div>
			</header>
			<main className='px-8 py-4'>
				<Match />
			</main>
			<footer className='bottom-0 fixed px-8 py-2 bg-[rgb(21,31,46)] w-full text-xs flex justify-center'>
				<a
					href='https://github.com/domucchi/anilist-watch'
					target='_blank'
					className='hover:text-blue-400'
				>
					Link to GitHub repository
				</a>
			</footer>
		</>
	);
}
