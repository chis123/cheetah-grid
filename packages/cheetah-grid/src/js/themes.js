'use strict';

const {extend, getIgnoreCase} = require('./internal/utils');
const theme = require('./themes/theme');
const {Theme} = theme;
const plugins = require('./plugins/themes');
const BASIC = new Theme(require('./themes/BASIC'));
const MATERIAL_DESIGN = new Theme(require('./themes/MATERIAL_DESIGN'));

const builtin = {
	BASIC,
	MATERIAL_DESIGN,
};
let defTheme = MATERIAL_DESIGN;
/**
 * themes
 * @type {Object}
 * @namespace cheetahGrid.themes
 * @memberof cheetahGrid
 */
const themes = {
	get default() {
		return defTheme;
	},
	set default(defaultTheme) {
		defTheme = themes.of(defaultTheme) || defTheme;
	},
	get MATERIAL_DESIGN() {
		return MATERIAL_DESIGN;
	},
	get BASIC() {
		return BASIC;
	},
	theme,
	of(value) {
		if (!value) {
			return null;
		}
		if (typeof value === 'string') {
			const t = getIgnoreCase(themes.choices, value);
			if (t) {
				return t;
			}
			return null;
		}
		if (value instanceof Theme) {
			return value;
		}
		return new Theme(value);
	},
	/**
	 * @namespace cheetahGrid.themes.choices
	 */
	get choices() {
		return extend(builtin, plugins);
	},
};
module.exports = themes;
