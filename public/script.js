/**
 * Copyright (c) 2020 by Jon Q <hello@jonquach.com> (https://jonquach.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (window, document) {
	/**
	 * This is the element ID of you embedded <script /> tag.
	 * Your amazon ID is stored there.
	 */
	const SCRIPT_ID = 'AmazonAffiliateInserterScriptTag';
	/**
	 * Creating a "cache" variable for the Amazon affiliate ID.
	 * We'll set your affiliate ID here once we find it.
	 * This cache is useful as we won't have to keep searching for your
	 * affiliate ID.
	 */
	let __affiliateId__;

	/**
	 * Retrieves your affiliate ID from our embed <script /> tag.
	 */
	function getAffiliateId() {
		/**
		 * During the first run, we won't have your affiliate ID yet.
		 * We'll attempt to grab it from our embed <script />, and store it
		 * into the cache.
		 */
		if (!__affiliateId__) {
			const scriptTag = document.getElementById(SCRIPT_ID);
			__affiliateId__ = scriptTag
				? scriptTag.getAttribute('data-id')
				: '';
		}

		return __affiliateId__;
	}

	/**
	 * Checks to see if an HTML element is a link with an Amazon URL.
	 * This is used for filtering.
	 *
	 * @param {HTMLElement} node The HTML element to check.
	 * @returns {boolean} If the element is an Amazon link.
	 */
	function isAmazonLinkNode(node) {
		if (node.tagName !== 'A') return false;
		return new URL(node.getAttribute('href')).origin.indexOf('amazon') >= 0;
	}

	/**
	 * Filters through a collection of HTML Elements to insert an Amazon affiliate ID (if possible).
	 * @param {Array<HTMLElement>|NodeList} links A collection of links to insert affiliate IDs into.
	 */
	function insertAffiliateIdIntoLinks(links = []) {
		Array.from(links).filter(isAmazonLinkNode).forEach(insertAffiliateId);
	}

	/**
	 * Inserts your Amazon affiliate ID.
	 * @param {HTMLLinkElement} linkNode The link node to insert the affiliate ID into.
	 */
	function insertAffiliateId(linkNode) {
		const url = new URL(linkNode.getAttribute('href'));
		const id = getAffiliateId();

		/**
		 * We'll update the link with your Amazon Affiliate ID!
		 */
		if (id) {
			url.searchParams.set('tag', id);
			linkNode.setAttribute('href', url);
		}
	}

	/**
	 * This is pretty special.
	 * We're going to create an "observer" that will insert your Amazon affiliate
	 * Id into new links!!
	 *
	 * What this will do is pay attention to your site, and watch for any
	 * changes in the HTML - specifically when new HTML elements are added.
	 *
	 * We'll check for link elements and add your Amazon affiliate ID to
	 * the new links.
	 */
	function createObserver() {
		const observer = new MutationObserver((mutationsList) => {
			for (let mutation of mutationsList) {
				if (
					mutation.type === 'childList' &&
					mutation.addedNodes.length
				) {
					/**
					 * New HTML elements detected!
					 * We'll add your Amazon affiliate ID, if applicable.
					 */
					insertAffiliateIdIntoLinks(mutation.addedNodes);
				}
			}
		});

		observer.observe(document, {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true,
		});
	}

	/**
	 * This runs our code.
	 */
	function run() {
		try {
			/**
			 * We'll look for any links, and start inserting your affiliate ID.
			 */
			const links = document.querySelectorAll('a[href]');
			insertAffiliateIdIntoLinks(links);
			/**
			 * Next, we'll create our observer to insert your affiliate ID
			 * to new links.
			 */
			createObserver();
		} catch {}
	}

	/**
	 * We'll run our code once your site is loaded.
	 */
	window.addEventListener('DOMContentLoaded', run);
})(window, document);
