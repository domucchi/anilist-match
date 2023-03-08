import './globals.css';

export const metadata = {
	title: 'AniList Match',
	description: 'Find your next anime match!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
