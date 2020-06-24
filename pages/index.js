import Head from 'next/head';

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<script
					src="./loader.js"
					id="AmazonAffiliateInserterScriptTag"
					data-id="superdesk-20"
				></script>
			</Head>

			<main>
				<a href="https://www.amazon.com">Link</a>
			</main>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
						Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
						Helvetica Neue, sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}
