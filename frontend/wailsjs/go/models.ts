export namespace font {
	
	export class FontVariant {
	    name: string;
	    FamilyName: string;
	    path: string;
	    readonly: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FontVariant(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.FamilyName = source["FamilyName"];
	        this.path = source["path"];
	        this.readonly = source["readonly"];
	    }
	}
	export class FontFamily {
	    id: number;
	    name: string;
	    variants: FontVariant[];
	    availableWeights: number[];
	    availableItalicWeights: number[];
	    hasReadonly: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FontFamily(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.variants = this.convertValues(source["variants"], FontVariant);
	        this.availableWeights = source["availableWeights"];
	        this.availableItalicWeights = source["availableItalicWeights"];
	        this.hasReadonly = source["hasReadonly"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace sources {
	
	export class Source {
	    name: string;
	    path: string;
	    icon: string;
	    dir_readonly: boolean;
	    source_readonly: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Source(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.icon = source["icon"];
	        this.dir_readonly = source["dir_readonly"];
	        this.source_readonly = source["source_readonly"];
	    }
	}

}

