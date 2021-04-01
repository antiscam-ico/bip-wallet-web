import {isValidMnemonic, walletFromMnemonic} from 'minterjs-wallet';
import {getAvatarUrl, shortHashFilter} from "~/assets/utils";
import {COIN_NAME} from '~/assets/variables';

export default {
    /**
     * Checks if user is authorized
     * @return {boolean}
     */
    isAuthorized(state, getters) {
        return getters.isUserAdvanced;
    },
    /**
     * Checks if user is authorized by private key
     * @return {boolean}
     */
    isUserAdvanced(state) {
        return state.auth && isValidMnemonic(state.auth);
    },
    /**
     * Checks if user is authorized by server
     * @return {boolean}
     */
    isUserWithProfile(state) {
        return false;
        // return !!state.auth.password;
    },
    wallet(state, getters) {
        if (getters.isUserAdvanced) {
            return walletFromMnemonic(state.auth);
        }
        return null;
    },
    address(state, getters) {
        if (getters.isUserAdvanced) {
            return getters.wallet.getAddressString();
        } else {
            return '';
        }
    },
    // addressUrl(state, getters) {
    //     return getExplorerAddressUrl(getters.address);
    // },
    mnemonic(state, getters) {
        return getters.isUserAdvanced ? state.auth : '';
    },
    privateKey(state, getters) {
        return getters.wallet ? getters.wallet.getPrivateKeyString() : '';
    },
    username(state, getters) {
        return shortHashFilter(getters.address, 4);
    },
    // usernameLetter(state, getters) {
    //     return getNameLetter(getters.username);
    // },
    avatar(state, getters) {
        const avatarByAddress = getters.address ? getAvatarUrl(getters.address) : '';
        // stored avatar first, bc. it can be changed manually after uploading new
        return avatarByAddress;
    },
    baseCoin(state) {
        return state.balance.find((coinItem) => {
            return coinItem.coin.symbol === COIN_NAME;
        });
    },
    /**
     * @return {string}
     */
    COIN_NAME() {
        return COIN_NAME;
    },
};
