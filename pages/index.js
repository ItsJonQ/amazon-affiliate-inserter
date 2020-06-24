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
				<a href="https://www.amazon.ca/dp/B0791Z1G6W/ref=ods_gw_smp_tnk_jun_evg?pf_rd_r=J76S6FZHCBRJN4RA3Y42&pf_rd_p=f38edca7-866c-45e6-930a-c810ee6aaccd">
					Link
				</a>
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
