// Meta Pixel browser tracking for Hope International Tutor Academy.
// CAPI calls are sent through /api/enrollment-lead.php so tokens never enter the browser.
(function () {
    'use strict';

    var PIXEL_ID = '1030696829380782';
    var CAPI_ENDPOINT = '/api/enrollment-lead.php';

    window.hitaMetaPixelId = PIXEL_ID;

    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', PIXEL_ID);

    function generateEventId(eventName) {
        var randomPart = Math.random().toString(36).slice(2, 10);
        return ['hita', eventName.toLowerCase(), Date.now(), randomPart].join('-');
    }

    function getCookie(name) {
        var pattern = new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)');
        var match = document.cookie.match(pattern);
        return match ? decodeURIComponent(match[1]) : '';
    }

    function getPathname() {
        return window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
    }

    function trackBrowserEvent(eventName, params, eventId) {
        var id = eventId || generateEventId(eventName);
        if (window.fbq) {
            fbq('track', eventName, params || {}, { eventID: id });
        }
        return id;
    }

    function sendCapiEvent(eventName, eventId, params) {
        if (!window.fetch) return Promise.resolve();

        return fetch(CAPI_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'track_event',
                event_name: eventName,
                event_id: eventId,
                event_source_url: window.location.href,
                fbp: getCookie('_fbp'),
                fbc: getCookie('_fbc'),
                custom_data: params || {}
            }),
            keepalive: true
        }).catch(function (error) {
            console.warn('Meta CAPI tracking request failed.', error);
        });
    }

    function getPageViewParams() {
        return {
            content_name: document.title || 'Hope International Tutor Academy',
            content_category: 'Education',
            content_type: 'page',
            page_path: getPathname()
        };
    }

    function trackPageView() {
        var eventId = generateEventId('PageView');
        var params = getPageViewParams();

        // Browser and server PageView share event_id so Meta can deduplicate them.
        trackBrowserEvent('PageView', params, eventId);
        sendCapiEvent('PageView', eventId, params);
    }

    function getViewContentParams(pathname) {
        if (pathname === '/student-enrollment') {
            return {
                content_name: 'Student Enrollment Lead Funnel',
                content_category: 'Education',
                content_type: 'lead_form',
                content_ids: ['student-enrollment']
            };
        }

        if (pathname === '/student-registration') {
            return {
                content_name: 'Student Registration',
                content_category: 'Education',
                content_type: 'lead_form',
                content_ids: ['student-registration']
            };
        }

        if (pathname === '/teacher-registration') {
            return {
                content_name: 'Teacher Registration',
                content_category: 'Education',
                content_type: 'lead_form',
                content_ids: ['teacher-registration']
            };
        }

        if (pathname === '/thank-you') {
            return {
                content_name: 'Enrollment Thank You Page',
                content_category: 'Education',
                content_type: 'confirmation_page',
                content_ids: ['thank-you']
            };
        }

        return null;
    }

    function getAnchorFromClick(target) {
        while (target && target !== document) {
            if (target.tagName && target.tagName.toLowerCase() === 'a') {
                return target;
            }
            target = target.parentNode;
        }

        return null;
    }

    function getContactClickParams(anchor) {
        if (!anchor || !anchor.href) return null;

        var href = anchor.getAttribute('href') || '';
        var absoluteHref = anchor.href;
        var normalizedHref = href.toLowerCase();
        var channel = '';

        if (normalizedHref.indexOf('tel:') === 0) {
            channel = 'phone';
        } else if (normalizedHref.indexOf('mailto:') === 0) {
            channel = 'email';
        } else if (/wa\.me|whatsapp\.com|api\.whatsapp\.com/i.test(absoluteHref)) {
            channel = 'whatsapp';
        } else {
            try {
                var url = new URL(absoluteHref);
                var path = url.pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
                if (path === '/contact') {
                    channel = 'contact_page';
                }
            } catch (error) {
                channel = '';
            }
        }

        if (!channel) return null;

        return {
            content_name: 'Contact Click',
            content_category: 'Education',
            content_type: 'contact_action',
            content_ids: ['contact-' + channel],
            contact_channel: channel,
            link_url: absoluteHref,
            link_text: (anchor.textContent || '').trim().slice(0, 120),
            page_path: getPathname()
        };
    }

    function trackContactClick(event) {
        var anchor = getAnchorFromClick(event.target);
        var params = getContactClickParams(anchor);

        if (!params) return;

        var eventId = generateEventId('Contact');

        trackBrowserEvent('Contact', params, eventId);
        sendCapiEvent('Contact', eventId, params);
    }

    function trackFormPageViewContent() {
        var params = getViewContentParams(getPathname());
        if (!params) return;

        var eventId = generateEventId('ViewContent');

        trackBrowserEvent('ViewContent', params, eventId);
        sendCapiEvent('ViewContent', eventId, params);
    }

    function trackThankYouCompletion() {
        if (getPathname() !== '/thank-you') return;

        var search = new URLSearchParams(window.location.search);
        var leadEventId = search.get('event_id');
        var registrationEventId = search.get('registration_event_id');
        var program = search.get('program') || 'Student Enrollment';
        var params = {
            content_name: 'Student Enrollment Lead',
            content_category: 'Education',
            content_type: 'lead_form',
            content_ids: ['student-enrollment'],
            status: 'submitted',
            program: program
        };

        if (leadEventId && sessionStorage.getItem('hita-lead-fired-' + leadEventId) !== 'true') {
            trackBrowserEvent('Lead', params, leadEventId);
            sessionStorage.setItem('hita-lead-fired-' + leadEventId, 'true');
        }

        if (registrationEventId && sessionStorage.getItem('hita-registration-fired-' + registrationEventId) !== 'true') {
            trackBrowserEvent('CompleteRegistration', params, registrationEventId);
            sessionStorage.setItem('hita-registration-fired-' + registrationEventId, 'true');
        }
    }

    window.HITA_META_TRACKING = {
        pixelId: PIXEL_ID,
        capiEndpoint: CAPI_ENDPOINT,
        generateEventId: generateEventId,
        getCookie: getCookie,
        trackBrowserEvent: trackBrowserEvent,
        sendCapiEvent: sendCapiEvent
    };

    document.addEventListener('click', trackContactClick, true);

    trackPageView();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            trackFormPageViewContent();
            trackThankYouCompletion();
        });
    } else {
        trackFormPageViewContent();
        trackThankYouCompletion();
    }
})();
