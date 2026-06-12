# Source Extracts — Web Accessibility

Verified passages backing SKILL.md, lightly de-noised from the book extraction (the Kalbag source text has spaces injected mid-word; wording is otherwise verbatim). Kalbag = *Accessibility for Everyone* (A Book Apart, 2017). WID = Metts & Welfle, *Writing Is Designing*, ch. 5 (Rosenfeld, 2020).

## Contents

- Universal vs accessible design (Mace, ramps, NYT text-size button)
- Context, devices, and the analytics caveat
- AT discipline (Watson)
- Semantic HTML and ARIA-as-last-resort
- Skip links, focus split, and tabindex
- Contrast and SSS
- Forms: format conversion, required labels, live regions
- Transcripts, captions, WebVTT
- Testing program (Twitter CI, Gibson matrix, device suite, recruiting)
- Org layer (policy, PM ownership, budgeting, SEO)
- WID ch. 5: writing accessibly

## Universal vs accessible design

Mace, quoted by Kalbag (ch. 1): "Universal design is the design of products and environments to be usable by all people, to the greatest extent possible, without the need for adaptation or specialized design."

"Accessible design might result in a building having a wheelchair ramp attached to its far side, as an afterthought… universal design might result in a building with a combined ramp and stairs, opening access to all and forcing no one to go out of their way to choose one option or the other."

The web translation: "Accessible web design might mean adding a button to your site that allows people to view the text at a larger size. It's yet another element crowding a page layout, and people have to go out of their way to find it." (Fig 1.5: the NYT's text-size buttons hidden in a top menu.) "Universal web design, applied to the same problem, might mean making all the text larger so that a greater number of people can read the text without needing to find a button or use zoom shortcuts." (Fig 1.6: "The default body text size on the New Republic's site is a generous 20 pixels, which makes the page instantly more inviting.")

Closing wish (ch. 8): "My one wish for the web is that people consider accessibility in the same way they think about web performance. The performance implications of a new tool or technique are always mentioned in blog posts and articles. Wouldn't it be great if the same were true for accessibility?"

## Context, devices, and the analytics caveat

"Advertising agency BBDO found that 64% of users browse the web on their mobile devices while at home, sitting on their sofas, using their Wi-Fi and broadband." IAB: 63% of mobile video watched at home, "not, in fact, 'on the go.'"

"The only reliable statistic we can get back from a person's browser is the width of the viewport… There are no user agent strings for these assistive technologies, leaving us with no idea of how many people are accessing the web with assistive hardware or software. We're left with little choice but to treat these technologies the same way we treat other devices—build for the unknown and test on as many as possible."

## AT discipline (Watson)

"Léonie Watson… says that designers often conflate a particular assistive technology with a particular disability—for example, assuming that everyone using a screen reader is blind. The technology is a key part of the research, but it isn't the same as the requirements of the individual."

"An important part of research with people using assistive technologies is to separate user requirements (user analysis) from technology needs (workflow analysis)."

"Just as you would not make design decisions based on feedback from just one user, don't make accessibility decisions based only on the recommendations of one person with a disability."

## Semantic HTML and ARIA-as-last-resort

"When we write well-structured HTML, without altering the default behaviors, it is innately accessible… Well-structured HTML is the secret weapon of web accessibility. With a solid HTML foundation, a site becomes instantly more accessible to a much wider audience."

"If you make spans, divs, and other usually non-interactive elements into interactive elements, you create confusion for those using screen readers and keyboard navigation, which rely on the accessible cues provided by the default HTML."

"ARIA should never be used to replace well-structured HTML. It should be your last resort. ARIA only interacts with the accessibility layer of a browser, so it doesn't provide the same inherent styles and behaviors that meaningful HTML provides. This also means that using ARIA won't make an unusable website more accessible."

## Skip links, focus split, and tabindex

"Some sites choose to make skip links invisible unless you're using a screen reader, but screen reader users rarely use skip links because screen readers have more sophisticated navigation to skip to content. Hiding skip links from everyone except screen reader users excludes the people who may benefit the most from skip links—sighted people using keyboard navigation. The best possible option is to make the skip links visible to all users so that all users benefit."

The era-bug (stale specifics, durable lesson): "At the time of writing, Safari and Chrome don't change the keyboard focus to the visual focus area when someone follows a skip link… The disjunction between visual and keyboard focus makes skip links utterly useless for keyboard navigation users as they're not actually skipping at all."

The fix: "tabindex='-1' removes an element from the tab index. That way no one can tab to it but the element can still receive focus from a link or via JavaScript… Scott Vinkle found that using tabindex='-1' on the element targeted by the skip link allows it to receive programmatic focus."

Reordering: "If a keyboard navigation user uses the Tab key to navigate, the tabindex order is honored, but if they use their cursor keys to navigate, the tabindex order is ignored. Because of these inconsistencies, altering the tab index is generally not advisable."

Focus styles: "For people using keyboard navigation, focus styles… are indispensable. You might recognize these styles if you've removed them in the past when they didn't fit in with your site's aesthetic. (Don't worry, I won't tell anyone. Just go put them back now.)"

## Contrast and SSS

"To some degree, using big or bold type will make your text stand out from the background. This frees you up to use slightly lower-contrast colors since the size and weight of the type will do some of the work of distinguishing text from background."

"While we aim for high contrast for the majority of visitors, if the contrast between text and background is too high, the text can appear to dance on screen. High-contrast text is particularly problematic for people with a dyslexic condition called scotopic sensitivity syndrome (SSS). People with SSS find that high-contrast text appears to shimmer or wobble on the screen."

"Geri Coady, author of… Color Accessibility Workflows, recommends working in grayscale to test your designs."

## Forms: format conversion, required labels, live regions

"A form returns an error because what we've entered is in an 'incorrect format'… But that's not a user error—that's the site developers' fault. Formatting the content of an input field should not be a burden placed on the user; the burden should be on the developers to convert user input into the necessary format." Options: on-the-fly JS conversion (Kickstarter's live card validation), clear microcopy, asynchronous validation.

"Often an asterisk is used to suggest a required field in a form, but this is a visual cue that only makes sense to users who have interacted with similar forms in the past. The clearest way… is to clearly show the word 'required' inside the label… Adding '(required)' tells you exactly what you need to know."

Label pairing: "Each form input should have a unique id, and its label should use the id of the input in its for= attribute."

Live regions: "aria-live='polite' signals that the update should be announced at the next graceful interval, such as when the user stops typing. Aria-live='assertive' indicates that the update should be announced to the user immediately… The assertive property can be quite obtrusive, so it should only be used when people need to be informed of something immediately—such as an error or alert relevant to their current actions."

## Transcripts, captions, WebVTT

"You may want to leave out irrelevant auditory and visual information to produce a clean verbatim transcript. '[Jessica coughs]' doesn't aid the understanding of the text. However, 'ums', 'ers' and other stutters and hesitations can offer more context and humanize a transcript. Including these details produces a true verbatim transcript, which is usually costlier."

"There aren't any particular standards for formatting transcripts, and they work best as good old HTML… I prefer to add headings and links to my transcripts as it makes them even easier to navigate and provides additional value over the audio or video."

WebVTT sample from the book:

```
WEBVTT

00:00:00.782 --> 00:00:05.000
Today, on Spyware 2.0: "Privacy"

00:00:05.100 --> 00:00:07.493
When we think of a private conversation,
```

Caption craft: keep to ≤2 lines; "If you watch closed captions on TV, or in a movie theater, you'll get an idea of the right line length and where it's comfortable to put a break in a phrase."

## Testing program

CI: "Twitter uses automated accessibility tests as a part of its build process… If a developer's code breaks the accessibility of the product, the automated test will fail and the developer is unable to deploy their work." Todd Kloots used failures as developer education. (Watson recommended Tenon API in the build — tool defunct; today: axe-core/Lighthouse/Pa11y.)

"Not all WCAG criteria can be programmatically verified, since many criteria focus on user experience."

Matrix: "Anne Gibson recommended following a testing matrix with a list of outputs along the top and inputs along the side… The corresponding boxes should then be filled out as you test with each combination of input and output."

Era device suite (stale list, durable justification rule): all major desktop OSes and browsers on defaults, major mobile OSes/browsers, "assistive technologies including screen readers (JAWS, NVDU [sic — NVDA], VoiceOver, Window-Eyes, Windows Narrator, ZoomText)," keyboard navigation, and OS/browser accessibility settings. "You need to be able to justify the devices, browsers, and assistive technologies you've chosen for testing… What did your user research show?"

"Screen reader output and keyboard input should be tested both together and separately."

Recruiting: "Choose testers who are accustomed to using the technologies they're testing with—that way you're testing the usability of your product, not their comfort with screen readers or keyboard navigation." Shawn Henry (Just Ask): "Find people who are fairly experienced using products like yours. If people use assistive technologies with your product, you probably want people who are skilled with their assistive technology." And: "Try your best not to test with people who are working on the project."

Spirit: "Going the extra mile to solve problems like vanishing placeholders is part of embracing challenges to find creative solutions. Accessibility isn't about passing a test or ticking a box; it's about making great experiences."

## Org layer

Policy traits: "Guidelines in your accessibility policy should be: clear and simply written, so anyone in your organization can refer to your policy and understand the implications and their role; hierarchical, so needs are prioritized as primary, secondary, etc.; and testable, so you can easily determine whether your site is sufficiently accessible." Exemplar: the UK Post Office's policy, moving from general aims to specifics.

Ownership: "Henny Swan… recommends that accessibility be owned by product managers. The product managers must consider how web accessibility affects what the organization does, understand the organization's legal duties, and consider the potential business benefits."

Budgeting: "Accessibility isn't a line item in an estimate or a budget—it's an underlying practice that affects every aspect of a project… You wouldn't add a line item to make a site performant, so don't do it for accessibility either." Small budgets: "designing a simpler interface without a carousel will benefit everyone using the site" vs. keyboard-enabling the carousel for a few.

SEO: Simon Cox (HSBC) "emphasizes that accessibility requirements should always trump search engine optimization: 'Normally a good compromise can be found that meets accessibility requirements and will work well for SEO—then everybody is happy.'" Never hide keywords in alt text.

## WID ch. 5: writing accessibly

Pacing: "The average reading time for sighted readers is two to five words per second. Screen-reader users can comprehend text being read at an average of 35 syllables per second, which is significantly faster. Don't be afraid to sacrifice brevity for clarity, especially when extra context is needed or useful."

Chronological: "Rather than saying: 'Click the OK button below to continue.' … Instead, say: 'Next, select OK to continue.'" And for a scroll-to-top control: "Go to beginning" rather than "Go to top." "Embrace the universal experience… the top is first, bottom is last paradigm."

Order: "Is there information critical to performing an action, or making a decision, that appears after (to the right or below) an action item…? If so, consider moving it." Figure 5.5: "Password hint microcopy below the password field won't help someone using a screen reader who hasn't made it there yet."

Device-agnostic: instead of click/tap/press/see, "try device-agnostic words that describe the action, irrespective of the interface, like: Choose, Select, View." Exception: teaching the gesture itself ("Pinch to zoom out").

PlayStation (Teiyu Goto, 1UP, 2010): "The circle and X represent 'yes' or 'no' decision-making… In Japan, an X shape is known as 'batsu,' and bears specific meaning around 'no, wrong, go back.' And conversely, the circle, 'maru,' means yes" — meanings most Western players have reversed. Icon and color semantics are cultural.

Pronouns: "Don't ask for 'preferred' pronouns. They are a statement of fact, not a request." Also: "Ask for a user's pronouns separately from asking them their gender (though most of the time, you don't need that information at all)… Make that information editable." Use singular they: "This form will be sent to a customer service representative. They'll be in touch within one business day."
