//import { $q, $$q, scroll, getNodeObj, enter } from "./utils";

const headingsMap = {
  introduction: "Introduction",
  "types-of-Mutual": "Types of Mutual Funds in India",
  "floater-funds": "Features of Floater Funds",
  "investing-mid-cap": "Advantages of investing in Mid Cap",
  benefits: "Benefits of investing in overnight funds",
  conclusion: "Conclusion",
};

function TocScrollspy(options) {
  const { headings: headingsSelector, toc: tocSelector } = options;
  const headings = getNodeObj(headingsSelector, $$q);
  const toc = getNodeObj(tocSelector);

  if ((!headings.node || !headings.node.length) || !toc.node) return;

  function onScroll() {
    const y = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const middle = y + windowHeight / 2;

    const sortedHeadings = headings.node
      .reduce((acc, heading) => {
        const headingObj = {
          id: heading.id,
          top: heading.getBoundingClientRect().top + y,
        };
        return [...acc, headingObj];
      }, [])
      .sort((a, b) => a.top - b.top);

    if (middle >= sortedHeadings[0].top) {
      showToc(toc.node);
    }

    if (y <= 0) {
      manageActiveState(sortedHeadings[0].id, toc.node);
      return;
    }

    if (y + windowHeight >= document.body.scrollHeight) {
      manageActiveState(sortedHeadings[sortedHeadings.length - 1].id, toc.node);
      return;
    }

    let currentId = sortedHeadings[0].id;

    for (let i = 0; i < sortedHeadings.length; i += 1) {
      if (middle >= sortedHeadings[i].top) {
        currentId = sortedHeadings[i].id;
      }
    }

    manageActiveState(currentId, toc.node);
  }

  onScroll();
  localScroll(onScroll);
  const activeHeading = $q("#active-heading");

  if ( activeHeading ) {
  	activeHeading.innerHTML = $(".lwptoc .lwptoc_item a[href]" ).text();
  }
}

function showToc(toc) {
  if (toc.classList.contains("hidden")) enter(toc, "fadeup");
}

function manageActiveState(id, toc) {
  const activeElement = $q(".active", toc);
  if (activeElement) activeElement.classList.remove("active");
  const activeHeading = $q("#active-heading");
  if (activeHeading && activeElement) {
    const activeElementLink = $q("a[href]", activeElement)
    activeHeading.innerHTML = activeElementLink.textContent;
  }
  const activeLink = $q(`[href="#${id}"]`, toc);
  if (activeLink) activeLink.parentElement.classList.add("active");
}

// if (this.DOM.tocNode) {
//   this.tocLinks = $$q("a[href]", this.DOM.tocNode);
//   this.isBottomSheetOpen = false;

//   this.DOM.tocNode.addEventListener("click", () => this.openBottomSheet());
//   window.addEventListener("click", e => this.closeBottomSheet(e));

//   this.tocLinks.forEach(link => {
//     link.addEventListener("click", () => {
//       setTimeout(() => {
//         if (this.isBottomSheetOpen) {
//           this.isBottomSheetOpen = false;
//           this.DOM.tocNode.classList.remove("section-nav-mobile-expand");
//           document.body.classList.remove("overflow");
//         }
//       });
//     });
//   });
// }

// openBottomSheet() {
//   if (!this.isBottomSheetOpen) {
//     this.isBottomSheetOpen = true;
//     this.DOM.tocNode.classList.add("section-nav-mobile-expand");
//     document.body.classList.add("overflow");
//   }
// }

// closeBottomSheet(event) {
//   if (this.isBottomSheetOpen && !this.DOM.tocNode.contains(event.target)) {
//     this.isBottomSheetOpen = false;
//     this.DOM.tocNode.classList.remove("section-nav-mobile-expand");
//     document.body.classList.remove("overflow");
//   }
// }
