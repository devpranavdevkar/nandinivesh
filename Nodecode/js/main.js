jQuery(function($) {

    //Append Easy Footnotes
    $('.easy-footnotes-wrapper').appendTo('.easyFootnotes');
    $('.easy-footnote').on( 'click', function() {
        $(".easyFootnotes").addClass("active");
    });
    $('.easy-foot-list-heading').on( 'click', function() {
        $(".easyFootnotes").toggle("active");
        $(this).children('figure').eq(1).toggleClass('rotate-180');
    });

    //Append to hero img
    $('.hero-img').appendTo('.hero-info');


    //Hide div from empty of easyfootnotes
    var notes = $(".easyFootnotes").html() == undefined ? '' : ( $(".easyFootnotes").html() ).trim();
    if ( notes == '' ) {
        $(".easy-foot-list").addClass("hidden");
    }

    function toggleFooter() {
        jQuery(".sub-menu h5").on("click", function() {
            jQuery("ul").removeClass("open-list");
            jQuery(".sub-menu").removeClass("menu-open-list");
            jQuery(this).closest(".sub-menu").find("ul").toggleClass("open-list");
            jQuery(this).closest(".sub-menu").toggleClass("menu-open-list");
        });
    }
    toggleFooter();

    // searchControl
    searchControl();

    function searchControl() {
        jQuery(".input-group").on("click", function(e) {
            jQuery(this).parents(".header-fixed").addClass("search-result");
            jQuery(this).children(".search-here").trigger("focus");
            e.stopPropagation();
        });

        jQuery(document).on("click", function(e) {
            if (
                jQuery(e.target).is(".input-group") === false) {
                jQuery(".header-fixed").removeClass("search-result");
                jQuery("ul.navbar-nav").show(50);
            }

            if ( 'plan' === mainJsExports?.postType ) {
                if ( ! jQuery(e.target).hasClass( 'search-icon--mobile' ) && ! jQuery(e.target).hasClass( 'search-icon' ) && ! jQuery(e.target).hasClass( 'plan-header__input-wrapper' ) ) {
                    jQuery( '.plan-header__input-wrapper' ).addClass( 'md:hidden' );
                    jQuery( '.search-icon--mobile' ).addClass( 'md:block' );
                    jQuery( '.nav-brand figure' ).removeClass( 'hidden' );
                }
            }
        });
        jQuery(".search-icon").on("click tap touchstart", function() {
            jQuery("input.search-here").trigger("focus");
        });

        if ( 'plan' === mainJsExports?.postType ) {
            jQuery( '.search-icon--mobile' ).on( 'click', function() {
                jQuery( '.plan-header__input-wrapper' ).removeClass( 'md:hidden' );
                jQuery( this ).removeClass( 'md:block' );
                jQuery( '.nav-brand figure' ).addClass( 'hidden' );
            } );
        }
    }

    navToggle();
    $(window).on( 'resize',function() {
        navToggle();
    });

    function navToggle() {
        $hamburger = jQuery(".navbar-toggler");

        if ( $hamburger.length ) {
            $hamburger.off( 'click.hamburger' );

            $hamburger.on( 'click.hamburger', function() {
                jQuery( '.nav-items' ).toggleClass( 'active' );
                jQuery( '.navbar' ).toggleClass( 'menu-active' );
                jQuery(this).toggleClass( 'collapsed' );
            });
        }

        if ( window.matchMedia('(max-width: 576px)').matches) {
            $headerFlag = $( '.header-flag' );

            if ( $headerFlag.length ) {
                $flagOverlayMobile = $headerFlag.find( '.header-flag__mobile-background-overlay' );
                $flagsList = $headerFlag.find( '.header-flag__list' ).first();

                $headerFlag.off( 'click.headerFlag' );
                $flagOverlayMobile.off( 'click.overlay' );

                $headerFlag.on( 'click.headerFlag', function() {
                    if ( 'none' === $flagsList.css( 'display' ) ) {
                        $flagsList.fadeIn( 'fast' );
                    }

                    $flagsList.addClass( 'slide-up' );
                    $flagOverlayMobile.fadeIn( '100' );
                } );

                $flagOverlayMobile.on( 'click.overlay', function( e ) {
                    e.stopPropagation();

                    $flagsList.removeClass( 'slide-up' );
                    $flagOverlayMobile.fadeOut();
                } );
            }
        } else {
            $headerFlag = $( '.header-flag' );
            $overlay = $headerFlag.find( '.header-flag__mobile-background-overlay' );

            if ( $headerFlag ) {
                $overlay.off( 'click.overlay' );
                $headerFlag.off( 'click.headerFlag' );

                $headerFlag.on( 'click.headerFlag', function() {
                    $( this ).find( '.header-flag__list' ).fadeToggle( 'fast' );
                } );
            }
        }

        if ( window.matchMedia('(max-width: 576px)').matches) {
            $headerUser = $( '.header-user-menu' );

            if ( $headerUser.length ) {
                $overlay = $headerUser.find( '.header-user-menu__mobile-background-overlay' );
                $menuItemList = $headerUser.find( '.header-user-menu__list' );

                $headerUser.off( 'click.headerUser' );
                $overlay.off( 'click.overlay' );

                $headerUser.on( 'click.headerUser', function() {
                    if ( 'none' === $menuItemList.css( 'display' ) ) {
                        $menuItemList.fadeIn( 'fast' );
                    }

                    $menuItemList.addClass( 'slide-up' );
                    $overlay.fadeIn( '100' );
                } );

                $overlay.on( 'click.overlay', function( e ) {
                    e.stopPropagation();

                    $menuItemList.removeClass( 'slide-up' );
                    $overlay.fadeOut();
                } );
            }
        } else {
            $headerUser = $( '.header-user-menu' );
            $overlay = $headerUser.find( '.header-user-menu__mobile-background-overlay' );

            if ( $headerUser ) {
                $overlay.off( 'click.overlay' );
                $headerUser.off( 'click.headerUser' );

                $headerUser.on( 'click.headerUser', function() {
                    $( this ).find( '.header-user-menu__list' ).fadeToggle( 'fast' );
                } );
            }
        }

        if ( window.matchMedia('(max-width: 992px)').matches) {
            jQuery("#headerMegaMenu > li > a").on( "click", function() {
                $backButton = $(this).parent().find('.sub-menu-back');
                $subMenuWrapper = $(this).parent().find('.submenu-wrapper');

                if ( ! $backButton.length ) {
                    const backText = $(this).text().trim();
                    const leftArrowSvg = '<svg class="mr-3" width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16504 0.234229C5.31502 0.384251 5.39927 0.587698 5.39927 0.799829C5.39927 1.01196 5.31502 1.21541 5.16504 1.36543L2.53064 3.99983L5.16504 6.63423C5.31076 6.78511 5.3914 6.98719 5.38958 7.19695C5.38775 7.40671 5.30362 7.60736 5.15529 7.75568C5.00697 7.90401 4.80632 7.98814 4.59656 7.98997C4.3868 7.99179 4.18472 7.91115 4.03384 7.76543L0.833839 4.56543C0.683862 4.41541 0.599609 4.21196 0.599609 3.99983C0.599609 3.7877 0.683862 3.58425 0.833839 3.43423L4.03384 0.234229C4.18386 0.0842524 4.38731 0 4.59944 0C4.81157 0 5.01502 0.0842524 5.16504 0.234229Z" fill="#404040"/>\
                        </svg>';

                    $subMenuWrapper.find(' > ul > div').prepend(
                        '<li class="sub-menu-back hidden bg-gray-50 cursor-pointer flex items-center text-gray-700">' + leftArrowSvg + backText + '</li>'
                    );
                }

                $subMenuWrapper.addClass('slide-right-to-left');

                $(document).off( 'click.subMenuBackButton' );

                $subMenuWrapper.find( '.sub-menu-back' ).on( 'click.subMenuBackButton', function() {
                    $subMenuWrapper.removeClass( 'slide-right-to-left' );
                } );
            } );
        }
    }

    // Faq
    faqAccordian();
    jQuery(".faq-lists:first").addClass("faq-active");
    jQuery(".faq-lists:first .faq-heading").addClass("active");
    jQuery(".faq-lists:first .faq-content").addClass("default");

    function faqAccordian() {
        jQuery(".faq-lists")
            .find(".faq-heading")
            .on("click", function() {
                const isActive = jQuery(this).hasClass("active");
                jQuery(".faq-heading").removeClass("active");
                jQuery(".faq-lists").removeClass("faq-active");
                if (!isActive) {
                    jQuery(this).toggleClass("active");
                    jQuery(this).parents(".faq-lists").toggleClass("faq-active");
                }

                jQuery(this).next().slideToggle("fast");
                jQuery(".faq-content").not(jQuery(this).next()).slideUp("fast");
            });
    }

    // Faq
    faqSchema();
    jQuery(".schema-faq-section:first").addClass("faq-active");
    jQuery(".schema-faq-section:first .schema-faq-question").addClass("active");
    jQuery(".schema-faq-section:first .schema-faq-answer").addClass("default");

    function faqSchema() {
        jQuery(".schema-faq-section")
            .find(".schema-faq-question")
            .on("click", function() {
                const isActive = jQuery(this).hasClass("active");
                jQuery(".schema-faq-question").removeClass("active");
                jQuery(".schema-faq-section").removeClass("faq-active");
                if (!isActive) {
                    jQuery(this).toggleClass("active");
                    jQuery(this).parents(".faq-lists").toggleClass("faq-active");
                }

                jQuery(this).next().slideToggle("fast");
                jQuery(".schema-faq-answer").not(jQuery(this).next()).slideUp("fast");
            });
    }

    // Tabs
    jQuery('#tabs-nav li:first-child').addClass('active');
    jQuery('.tab-content').hide();
    jQuery('.tab-content:first').show();
    jQuery('#tabs-nav li').on( 'click', function() {
        jQuery('#tabs-nav li').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.tab-content').hide();
        var activeTab = jQuery(this).find('a').attr('href');
        jQuery(activeTab).show();
        return false;
    });

    //Recent post Tabs
    jQuery('#categoryNav li:first-child').addClass('active');
    jQuery('.category-content').hide();
    jQuery('.category-content:first').show();
    jQuery('#categoryNav li').on( 'click',function() {
        jQuery('#categoryNav li').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.category-content').hide();
        var activeTab = jQuery(this).find('a').attr('href');
        jQuery(activeTab).show();
        return false;
    });



    //types of mutual fund section
    jQuery('#mutualFund li:first-child').addClass('active');
    jQuery('.mutual-fund-content').hide();
    jQuery('.mutual-fund-content:first').show();
    jQuery('#mutualFund li').on( 'click', function() {
        jQuery('#mutualFund li').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.mutual-fund-content').hide();
        var activeTab = jQuery(this).find('a').attr('href');
        jQuery(activeTab).show();
        return false;
    });


    // Drop Down
    jQuery(".dropdown ul li").on("click", function() {
        const label = jQuery(this).parent().parent().children("label");
        label.attr("data-value", jQuery(this).attr("data-value"));
        label.html(jQuery(this).html());

        jQuery(this).parent().children(".selected").removeClass("selected");
        jQuery(this).addClass("selected");
    });


});

/**
 * Vanilla JS.
 */
window.addEventListener("DOMContentLoaded", () => {
    // Reading Position Indicator
    ReadingPositionIndicator({
        progressBar: "[data-progress-bar]",
        content: "[data-progress-content]",
    });

    let headingsSelector = '[data-progress-content] h2 > span';
    let tocSelector = '[data-toc]';

    if ( 'plan' === mainJsExports?.postType ) {
      headingsSelector = '.site-main h2 > span';
      tocSelector = '.sidebar-block .widget_lpwtoc_widget';
    }

    // Table of content with ScrollSpy
    TocScrollspy({
        headings: headingsSelector,
        toc: tocSelector,
    });

    // Social Share
    const metaDescription = $q("meta[property='og:description']");
    const description =
        metaDescription && metaDescription.getAttribute("content");

    SocialShare({
        metaData: {
            url: document.URL,
            title: document.title,
            description,
        },
        twitter: "[data-twitter]",
        facebook: "[data-facebook]",
        linkedin: "[data-linkedin]",
        email: "[data-email]",
        whatsapp: "[data-whatsapp]",
    });

    $(".country-dropdown a").on('click', function(e) {
        $(".country-dropdown ul").toggle();
        e.preventDefault();
    });

    $(".country-dropdown  ul li a").on( 'click', function() {
        var text = $(this).html();
        $(".country-dropdown  a span").html(text);
        $(".country-dropdown ul").hide();

    });

    $(document).on('click', function(e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("country-dropdown"))
            $(".country-dropdown  ul").hide();
    });

});

// Force jQuery scroll listener to be passive.
jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};
