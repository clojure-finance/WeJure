["^ ","~:resource-id",["~:shadow.build.classpath/resource","starter/js/test.js"],"~:compiled-at",1678526235086,"~:js","var module$node_modules$gun$browser = shadow.js.require(\"module$node_modules$gun$browser\", {});\nvar module$node_modules$gun$sea = shadow.js.require(\"module$node_modules$gun$sea\", {});\nfunction changetxt$$module$starter$js$test() {\n  var textAtom = window.starter.components.testPage.text;\n  starter.helper.atom.atom_set(textAtom, \"Goodbye\");\n}\n/** @const */ \nvar module$starter$js$test = {};\n/** @const */ \nmodule$starter$js$test.changetxt = changetxt$$module$starter$js$test;\n\n$CLJS.module$starter$js$test=module$starter$js$test;","~:js-symbol-names",["~#set",["module$starter$js$test","changetxt$$module$starter$js$test"]],"~:properties",["^5",["changetxt"]],"~:source","import GUN from 'goog:module$node_modules$gun$browser';\r\nimport 'goog:module$node_modules$gun$sea';\r\n\r\nexport function changetxt() {\r\n    var textAtom = window.starter.components.testPage.text;\r\n    starter.helper.atom.atom_set(textAtom, \"Goodbye\");\r\n}","~:source-map-json","{\n\"version\":3,\n\"file\":\"module$starter$js$test.js\",\n\"lineCount\":11,\n\"mappings\":\"A;;AAGOA,QAASA,kCAAS,EAAG;AACxB,MAAIC,WAAWC,MAAOC,CAAAA,OAAQC,CAAAA,UAAWC,CAAAA,QAASC,CAAAA,IAAlD;AACAH,SAAQI,CAAAA,MAAOC,CAAAA,IAAKC,CAAAA,QAApB,CAA6BR,QAA7B,EAAuC,SAAvC,CAAA;AAFwB;AAH5B;AAAA,IAAAS,yBAAA,EAAA;AAGgBV;AAAAA,sBAAAA,CAAAA,SAAAA,GAAAA,iCAAAA;;\",\n\"sources\":[\"starter/js/test.js\"],\n\"sourcesContent\":[\"import GUN from 'goog:module$node_modules$gun$browser';\\r\\nimport 'goog:module$node_modules$gun$sea';\\r\\n\\r\\nexport function changetxt() {\\r\\n    var textAtom = window.starter.components.testPage.text;\\r\\n    starter.helper.atom.atom_set(textAtom, \\\"Goodbye\\\");\\r\\n}\"],\n\"names\":[\"changetxt\",\"textAtom\",\"window\",\"starter\",\"components\",\"testPage\",\"text\",\"helper\",\"atom\",\"atom_set\",\"$jscomp$tmp$exports$module$name\"]\n}\n","~:eval-js","SHADOW_ENV.evalLoad(\"module$starter$js$test.js\", true , \"var module$node_modules$gun$browser \\x3d shadow.js.require(\\x22module$node_modules$gun$browser\\x22, {});\\nvar module$node_modules$gun$sea \\x3d shadow.js.require(\\x22module$node_modules$gun$sea\\x22, {});\\nfunction changetxt$$module$starter$js$test() {\\n  var textAtom \\x3d window.starter.components.testPage.text;\\n  starter.helper.atom.atom_set(textAtom, \\x22Goodbye\\x22);\\n}\\n/** @const */ \\nvar module$starter$js$test \\x3d {};\\n/** @const */ \\nmodule$starter$js$test.changetxt \\x3d changetxt$$module$starter$js$test;\\n\\n$CLJS.module$starter$js$test\\x3dmodule$starter$js$test;\");"]