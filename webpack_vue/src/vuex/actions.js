module.exports.addModuleListItem = function({dispatch}) {dispatch('ADD_MODULEDATALIST_ITEM');}

module.exports.delModuleListItem = function({dispatch}) {dispatch('DEL_MODULEDATALIST_ITEM');}

module.exports.upModuleListItem = function({dispatch},param){dispatch('UP_MODULEDATALIST_ITEM',param)};

module.exports.downModuleListItem = function({dispatch},param){dispatch('DOWN_MODULEDATALIST_ITEM',param)}