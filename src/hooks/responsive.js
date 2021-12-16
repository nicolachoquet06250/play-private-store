import { reactive, watch, ref } from 'vue';

const responsiveCallbacks = reactive({
    xs: [],
    sm: [],
    md: [],
    lg: []
});

const handleResizeGlobal = ref([]);

const SIZES = {
    xs:  '(max-width: 576px)',
    sm:  '(min-width: 576px)',
    md:  '(min-width: 768px)',
    lg:  '(min-width: 992px)',
    xl:  '(min-width: 1200px)',
    xxl: '(min-width: 1400px)'
};

const XS = 'xs';
const SM = 'sm';
const MD = 'md';
const LG = 'LG';

const addCallback = size => cb => {
    responsiveCallbacks[size] = [
        ...responsiveCallbacks[size],
        cb
    ];

    if (window.matchMedia(SIZES[size]).matches) {
        cb(window.innerWidth, window.innerHeight);
    }
}

export function useResponsive() {
    return {
        xs: addCallback(XS),
        sm: addCallback(SM),
        md: addCallback(MD),
        lg: addCallback(LG),
        resize(cb) {
            handleResizeGlobal.value = [
                ...handleResizeGlobal.value,
                cb
            ];
    
            cb(window.innerWidth, window.innerHeight);
        }
    }
}

const handleResize = () => {
    for (const size of Object.keys(responsiveCallbacks)) {
        const mediaQuery = SIZES[size];
        
        if (window.matchMedia(mediaQuery).matches) {
            responsiveCallbacks[size].map(cb => cb(window.innerWidth, window.innerHeight))
        }
    }

    handleResizeGlobal.value.map(cb => cb(window.innerWidth, window.innerHeight));
};

window.addEventListener('resize', handleResize);

watch(responsiveCallbacks, () => {
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
})