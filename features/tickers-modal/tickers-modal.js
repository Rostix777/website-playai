// Tickers modal
const tickers = [
  {t:'FRHC',n:'FREEDOM HOLDING CORP-NV'},{t:'NVDA',n:'Nvidia Corporation'},{t:'TSLA',n:'Tesla Motors Inc'},{t:'NBIS',n:'Nebius Group NV'},{t:'AMD',n:'Advanced Micro Devices'},{t:'MSTR',n:'MicroStrategy Incorporated'},
  {t:'NFLX',n:'NetFlix Inc.'},{t:'MARA',n:'Marathon Digital Holdings Inc'},{t:'ORCL',n:'Oracle Corp.'},{t:'MU',n:'Micron Technology'},{t:'COIN',n:'Coinbase Global, Inc.'},{t:'IREN',n:'Iris Energy Ltd'},
  {t:'PLTR',n:'Palantir Technologies Inc'},{t:'GOOGL',n:'ALPHABET INC-CL A'},{t:'CRWV',n:'CoreWeave'},{t:'META',n:'Meta Platforms, Inc.'},{t:'AMZN',n:'Amazon.com Inc'},{t:'AAPL',n:'Apple Inc.'},
  {t:'HOOD',n:'Robinhood Markets Inc'},{t:'INTC',n:'Intel Corp.'},{t:'MSFT',n:'Microsoft Corp.'},{t:'BMNR',n:'BitMine Immersion Technologies Inc'},{t:'CLSK',n:'Cleanspark Inc'},{t:'AVGO',n:'BROADCOM INC'},
  {t:'SMCI',n:'Super Micro Computer Inc'},{t:'CIFR',n:'Cipher Mining Inc'},{t:'SOFI',n:'SoFi Technologies Inc'},{t:'CRCL',n:'Circle Internet Corp'},{t:'PYPL',n:'PAYPAL HLDGS INC'},{t:'FLNC',n:'FLUENCE ENERGY INC'},
  {t:'RKLB',n:'Rocket Lab Corporation'},{t:'IONQ',n:'IonQ Inc'},{t:'KO',n:'Coca Cola Co.'},{t:'O',n:'Realty Income Corp'},{t:'NKE',n:'NIKE Inc.'},{t:'PFE',n:'Pfizer Inc.'},
  {t:'QBTS',n:'D-Wave Quantum Inc'},{t:'ADBE',n:'Adobe Systems Inc'},{t:'UBER',n:'Uber Technologies'},{t:'RIOT',n:'Riot Platforms Inc'},{t:'MRVL',n:'MARVELL TECHNOLOGY INC'},{t:'MRNA',n:'Moderna Inc'},
  {t:'RGTI',n:'RIGETTI COMPUTING INC'},{t:'HIMS',n:'HIMS & HERS HEALTH INC'},{t:'ONDS',n:'Ondas Holdings Inc'},{t:'S',n:'SentinelOne Inc'},{t:'CRM',n:'Salesforce.com'},{t:'ZETA',n:'Zeta Global Holdings Corp'},
  {t:'CCHH',n:'CCH Holdings Ltd'},{t:'UNH',n:'United Health Group Inc.'},{t:'RIVN',n:'Rivian Automotive Inc.'},{t:'AA',n:'Alcoa Inc'},{t:'NEM',n:'Newmont Mining Corp. (Hldg. Co.)'},{t:'SMR',n:'NuScale Power Corp'},
  {t:'LULU',n:'Lululemon Athletica Inc'},{t:'VNRX',n:'VolitionRX Ltd'},{t:'APLD',n:'Applied Digital Corp'},{t:'GOOG',n:'ALPHABET INC-CL C'},{t:'AAL',n:'American Airlines Group, Inc.'},{t:'TTD',n:'The Trade Desk Inc'},
  {t:'ZIM',n:'ZIM Integrated Shipping Services Ltd'},{t:'WULF',n:'Terawulf Inc'},{t:'BA',n:'Boeing Company'},{t:'BBAI',n:'BigBear.ai Holdings Inc'},{t:'V',n:'Visa Inc.'},{t:'VICI',n:'VICI Properties Inc'},
  {t:'PATH',n:'UiPath Inc'},{t:'ZM',n:'Zoom Video Inc'},{t:'DELL',n:'Dell Inc.'},{t:'ACHR',n:'Archer Aviation Inc'},{t:'APP',n:'Applovin Corporation'},{t:'DUOL',n:'Duolingo Inc'},
  {t:'AG',n:'First Majestic Silver Corp.'},{t:'VZ',n:'Verizon Communications'},{t:'ASTS',n:'AST SpaceMobile Inc'},{t:'F',n:'Ford Motor'},{t:'WBD',n:'WARNER BROS DISCOVERY INC'},{t:'LYFT',n:'Lyft Inc'},
  {t:'QUBT',n:'Quantum Computing Inc'},{t:'EXK',n:'Endeavour Silver Corporation'},{t:'OKLO',n:'OKLO INC'},{t:'SNOW',n:'Snowflake Inc.'},{t:'SNDK',n:'SanDisk Corporation'},{t:'SNAP',n:'SNAP INC'},
  {t:'QCOM',n:'QUALCOMM Inc.'},{t:'TCGL',n:'TechCreate Group'},{t:'DKNG',n:'DraftKings Inc'},{t:'ARRY',n:'Array Technologies Inc'},{t:'FCX',n:'Freeport-McMoran Cp & Gld'},{t:'PONY',n:'Pony AI Inc'},
  {t:'WMT',n:'Wal-Mart Stores'},{t:'ALB',n:'Albemarle Corporation'},{t:'UPST',n:'Upstart'},{t:'ALAB',n:'Astera Labs'},{t:'T',n:'AT&T Inc'},{t:'SOUN',n:'SoundHound AI Inc'},
  {t:'CCL',n:'Carnival Corp.'},{t:'SPCE',n:'Virgin Galactic Holdings Inc'},{t:'CDE',n:'Coeur Mining Inc'},{t:'OXY',n:'Occidental Petroleum'},{t:'BULL',n:'Webull Corporation'},{t:'DJT',n:'Trump Media & Technology Group Corp'},
  {t:'GTLB',n:'GitLab Inc'},{t:'MRK',n:'Merck & Co.'},{t:'CHOW',n:'ChowChow Cloud International Holdings Ltd'},{t:'HOVR',n:'New Horizon Aircraft Ltd'},{t:'DAL',n:'Delta Air Lines Inc'},{t:'PAAS',n:'Pan American Silver Corp.'},
  {t:'INTS',n:'INTENSITY THERAPEUTICS INC'},{t:'SMX',n:'Empatan PLC'},{t:'PANW',n:'Palo Alto Networks'},{t:'CRDO',n:'Credo Technology Group Holding Ltd'},{t:'VRT',n:'Vertiv Holdings Co'},{t:'NVTS',n:'Navitas Semiconductor Corp'},
  {t:'U',n:'Unity Software Inc'},{t:'BYND',n:'BEYOND MEAT INC'},{t:'PLUG',n:'Plug Power Inc'},{t:'RUN',n:'Sunrun Inc'},{t:'BE',n:'Bloom Energy Corp'},{t:'PL',n:'Planet Labs PBC'},
  {t:'PG',n:'Procter & Gamble'},{t:'XOM',n:'Exxon Mobil Corp.'},{t:'HUT',n:'HUT 8 MINING CORP'},{t:'PINS',n:'Pinterest Inc'},{t:'B',n:'Barrick Mining Corp'},{t:'BAC',n:'Bank of America Corp'},
  {t:'NU',n:'NU HOLDINGS LTD'},{t:'CRWD',n:'CrowdStrike Holdings'},{t:'WRD',n:'WeRide Inc'},{t:'CVX',n:'Chevron Corp.'},{t:'MP',n:'MP Materials Corp'},{t:'SIDU',n:'Sidus Space Inc'},
  {t:'MOS',n:'The Mosaic Company'},{t:'BTBT',n:'BIT DIGITAL INC'},{t:'ENVX',n:'ENOVIX CORP'},{t:'LUNR',n:'Intuitive Machines Inc'},{t:'ZS',n:'ZSCALER, INC.'},{t:'NXE',n:'NexGen Energy Ltd'},
  {t:'XYZ',n:'Block Inc'},{t:'AGNC',n:'AGNC Investment Corp'},{t:'EOSE',n:'Eos Energy Enterprises Inc'},{t:'ANET',n:'Arista Networks, Inc.'},{t:'ASST',n:'STRIVE INC'},{t:'VSCO',n:'Victoria`s Secret & Co'},
  {t:'FUBO',n:'fuboTV Inc'},{t:'OSRH',n:'OSR Holdings Inc'},{t:'DIS',n:'Walt Disney Co.'},{t:'CGC',n:'CANOPY GROWTH CORP'},{t:'ENPH',n:'Enphase Energy Inc'},{t:'OSCR',n:'OSCAR HEALTH INC - CLASS A'},
  {t:'SNPS',n:'Synopsys, Inc.'},{t:'MBLY',n:'Mobileye Global Inc'},{t:'WVE',n:'WAVE Life Sciences Ltd'},{t:'ESPR',n:'Esperion Therapeutics Inc'},{t:'TLRY',n:'TILRAY INC-CLASS 2 COMMON'},{t:'PTON',n:'Peloton Interactive'},
  {t:'LLY',n:'Lilly (Eli) & Co.'},{t:'BMY',n:'Bristol-Myers Squibb'},{t:'OPEN',n:'Opendoor Technologies'},{t:'AFRM',n:'Affirm Holdings Inc'},{t:'QS',n:'QUANTUMSCAPE CORP'},{t:'JPM',n:'JPMorgan Chase & Co.'},
  {t:'AI',n:'C3.ai Inc'},{t:'JNJ',n:'Johnson & Johnson'},{t:'OKTA',n:'Okta, Inc.'},{t:'CCJ',n:'Cameco Corporation'},{t:'TGT',n:'Target Corp.'},{t:'DDOG',n:'Datadog Inc'},
  {t:'DOCU',n:'DocuSign Inc'},{t:'WDC',n:'Western Digital'},{t:'TMC',n:'TMC the metals co Inc'},{t:'USAR',n:'USA Rare Earth Inc'},{t:'UAL',n:'United Airlines Holdings, Inc.'},{t:'SLB',n:'Schlumberger Ltd.'},
  {t:'RDW',n:'Redwire Corp'},{t:'CVNA',n:'CARVANA CO'},{t:'SBET',n:'SharpLink Gaming Ltd'},{t:'CELH',n:'Celsius Holdings, Inc. - Common Stock'},{t:'ONON',n:'On Holding AG'},{t:'MO',n:'Altria Group Inc'},
  {t:'WU',n:'Western Union Co'},{t:'UPS',n:'United Parcel Service'},{t:'UUUU',n:'Energy Fuels Inc'},{t:'PEP',n:'PepsiCo Inc.'},{t:'UBXG',n:'U-BX Technology Ltd'},{t:'ATEN',n:'A10 Networks Inc'},
  {t:'MCD',n:'McDonald\'s Corp.'},{t:'ANIX',n:'Anixa Biosciences Inc'},{t:'MDB',n:'MongoDB Inc'},{t:'HAL',n:'Halliburton Co.'},{t:'RDDT',n:'Reddit Inc'},{t:'MAIN',n:'Main Street Capital Corp'},
  {t:'QXO',n:'QXO Inc'},{t:'BTCS',n:'BTCS Inc'},{t:'ATYR',n:'aTyr Pharma Inc'},{t:'ARCC',n:'Ares Capital Corporation'},{t:'NB',n:'NioCorp Developments Ltd'},{t:'DOCN',n:'DigitalOcean Holdings'},
  {t:'INHD',n:'Inno Holdings Inc'},{t:'UEC',n:'Uranium Energy Corp.'},{t:'STLA',n:'STELLANTIS NV'},{t:'BEEM',n:'Beam Global'},{t:'RBLX',n:'Roblox Corp'},{t:'PR',n:'Permian Resources Corp'},
  {t:'RR',n:'Richtech Robotics Inc'},{t:'ALK',n:'Alaska Air Group Inc.'},{t:'RBRK',n:'Rubrik Inc'},{t:'MDLN',n:'Medline'},{t:'ARE',n:'Alexandria Real Estate Equities Inc'},{t:'AGL',n:'agilon health Inc'},
  {t:'HL',n:'Hecla Mining Co.'},{t:'EBAY',n:'eBay Inc.'},{t:'BTDR',n:'Bitdeer Technologies Group'},{t:'KALA',n:'Kala Pharmaceuticals Inc'},{t:'UWMC',n:'UWM Holdings Corp'},{t:'JOBY',n:'Joby Aviation Inc'},
  {t:'CMCSA',n:'Comcast Corp.'},{t:'ANF',n:'Abercrombie & Fitch Company A'},{t:'ABNB',n:'Airbnb'},{t:'CADL',n:'Candel Therapeutics Inc'},{t:'FTNT',n:'Fortinet Inc.'},{t:'ORC',n:'Orchid Island Capital Inc'},
  {t:'MA',n:'Mastercard Inc.'},{t:'WLTH',n:'Wealthfront Corp'},{t:'RIG',n:'Transocean LTD'},{t:'SKYX',n:'SKYX Platforms Corp'},{t:'LUV',n:'Southwest Airlines'},{t:'RCAT',n:'Red Cat Holdings Inc'},
  {t:'ELF',n:'ELF Beauty Inc'},{t:'GEV',n:'GE Vernova LLC'},{t:'LAZR',n:'Luminar Technologies Inc'},{t:'NCLH',n:'NORWEGIAN CRUISE LINE HOLDIN'},{t:'NEE',n:'NextEra Energy Inc'},{t:'ESTC',n:'Elastic NV'},
  {t:'CAT',n:'Caterpillar Inc.'},{t:'STKL',n:'SunOpta Inc.'},{t:'NOV.EU',n:'Novo Nordisk A/S'},{t:'FMC',n:'FMC Corporation'},{t:'IBM',n:'International Bus. Machines'},{t:'MMM',n:'3M Co.'},
  {t:'RKT',n:'Rocket Companies Inc'},{t:'C',n:'Citigroup Inc.'},{t:'LEXX',n:'Lexaria Bioscience Corp'},{t:'RACE',n:'Ferrari'},{t:'SBUX',n:'Starbucks Corp.'},{t:'SGML',n:'Sigma Lithium Corp'},
  {t:'SERV',n:'Serve Robotics Inc'},{t:'KGC',n:'Kinross Gold Corp'},{t:'LFMD',n:'LifeMD Inc'},{t:'SHOP',n:'Shopify Inc.'},{t:'BRZE',n:'Braze Inc'},{t:'FRMI',n:'Fermi Inc'},
  {t:'NTNX',n:'Nutanix Inc'},{t:'MELI',n:'Mercadolibre Inc'},{t:'WRBY',n:'Warby Parker Inc'},{t:'HAS',n:'Hasbro Inc.'},{t:'SYM',n:'Symbotic Inc'},{t:'IAG',n:'Iamgold Corporation'},
  {t:'HNST',n:'Honest Co Inc-The'},{t:'CORZ',n:'Core Scientific Inc'},{t:'TONX',n:'TON Strategy Co'},{t:'ORGN',n:'Origin Materials Inc'},{t:'ORLA',n:'Orla Mining Ltd'},{t:'NET',n:'Cloudflare Inc'},
  {t:'CLS',n:'Celestica Inc'},{t:'NFE',n:'New Fortress Energy LLC'},{t:'BDTX',n:'BLACK DIAMOND THERAPEUTICS'},{t:'CETX',n:'Cemtrex Inc'},{t:'M',n:'Macy\'s Inc.'},{t:'CSCO',n:'Cisco Systems'},
  {t:'YCBD',n:'cbdMD Inc'},{t:'AMAT',n:'Applied Materials Inc'},{t:'TMUS',n:'T-Mobile US Inc.'},{t:'CPRT',n:'Copart Inc.'},{t:'VST',n:'Vistra Energy Corp'},{t:'DLO',n:'Dlocal Ltd'},
  {t:'COST',n:'Costco Co.'},{t:'PPTA',n:'Perpetua Resources Corp'},{t:'PSN',n:'PARSONS CORP'},{t:'UDMY',n:'Udemy Inc'},{t:'RXRX',n:'Recursion Pharmaceuticals'},{t:'QCLS',n:'Q-C Technologies Inc'},
  {t:'ACHV',n:'Achieve Life Sciences Inc'},{t:'SONY',n:'SONY CORP-SPONSORED ADR'},{t:'ADI',n:'Analog Devices Inc'},{t:'KDK',n:'Kodiak AI Inc'},{t:'ZDGE',n:'Zedge Inc'},{t:'HPE',n:'HEWLETT PACKARD ENTERPRISE CO'},
  {t:'ABAT',n:'American Battery Technology Co'},{t:'STX',n:'SEAGATE TECHNOLOGY HOLDINGS'},{t:'OKE',n:'ONEOK'},{t:'DHT',n:'DHT Holdings, Inc.'},{t:'LRN',n:'STRIDE INC'},{t:'ACN',n:'Accenture PLC'},
  {t:'BILL',n:'BILL Holdings Inc'},{t:'OCG',n:'Oriental Culture Holding Ltd'},{t:'LMT',n:'Lockheed Martin Corp.'},{t:'TGL',n:'Treasure Global Inc'},{t:'KHC',n:'KRAFT HEINZ CO'},{t:'MTCH',n:'Match Group Inc'},
  {t:'CIVI',n:'Civitas Resources Inc'},{t:'DC',n:'Dakota Gold Corp'},{t:'LYB',n:'LyondellBasell Industries NV'},{t:'SHLS',n:'Shoals Technology Group'},{t:'ANDG',n:'ANDERSEN GROUP'},{t:'COP',n:'ConocoPhillips'},
  {t:'OTLK',n:'Outlook Therapeutics Inc'},{t:'NNOX',n:'Nano-X Imaging Ltd'},{t:'FSLY',n:'Fastly Inc'},{t:'NUVB',n:'UVATION BIO INC'},{t:'TWLO',n:'Twilio Inc'},{t:'RELY',n:'REMITLY GLOBAL INC'},
  {t:'TTWO',n:'TAKE-TWO INTERACTIVE SOFTWARE INC'},{t:'RCL',n:'Royal Caribbean Cruises'},{t:'PTRN',n:'Pattern Group Inc'},{t:'LRCX',n:'Lam Research Corporation'},{t:'FSLR',n:'First Solar Inc'},{t:'XTKG',n:'Powerbridge Technologies Co Ltd'},
  {t:'BITF',n:'Bitfarms Ltd-Canada'},{t:'TRIP',n:'TripAdvisor Inc.'},{t:'FCEL',n:'FuelCell Energy Inc'},{t:'FISV',n:'Fiserv Inc'},{t:'HYMC',n:'	Hycroft Mining Holding Corp'},{t:'DOCS',n:'Doximity Inc'},
  {t:'CPRI',n:'Capri Holdings Ltd'},{t:'CNXC',n:'Concentrix Corp'},{t:'PAGS',n:'PagSeguro Digital Ltd.'},{t:'TOST',n:'TOAST INC-CLASS A'},{t:'ADTX',n:'Aditxt Inc'},{t:'NVAX',n:'Novavax share'},
  {t:'CROX',n:'Crocs Inc'},{t:'UPWK',n:'Upwork Inc'},{t:'KTOS',n:'Kratos Defense & Security Solutions Inc.'},{t:'GE',n:'General Electric'},{t:'NTLA',n:'Intellia Therapeutics Inc'},{t:'PERF',n:'Perfect Corp'},
  {t:'CVS',n:'CVS Health Corp'},{t:'QTTB',n:'Homology Medicines Inc'},{t:'VG',n:'Venture Global'},{t:'CERT',n:'Certara Inc'},{t:'LAES',n:'SEALSQ Corp'},{t:'CRML',n:'Critical Metals Corp'},
  {t:'IBKR',n:'Interactive Brokers Group Inc'},{t:'LCID',n:'Lucid Group Inc'},{t:'GEMI',n:'Gemini Space Station, Inc.'},{t:'ALT',n:'Altimmune Inc'},{t:'VKTX',n:'Viking Therapeutics, Inc.'},{t:'CMG',n:'Chipotle Mexican Grill'},
  {t:'DLTR',n:'Dollar Tree Inc.'},{t:'SPOT',n:'Spotify Technology SA'},{t:'AEHR',n:'Aehr Test Systems'},{t:'APLT',n:'Applied Therapeutics, Inc. - Common Stock'},{t:'PM',n:'Philip Morris International'},{t:'RZLT',n:'Rezolute Inc'},
  {t:'NOW',n:'ServiceNow'},{t:'NEXT',n:'NextDecade Corp'},{t:'PSIG',n:'PS International Group Ltd'},{t:'KVYO',n:'Klaviyo, Inc. Series A'},{t:'DG',n:'Dollar General Corp.'},{t:'HP',n:'Helmerich & Payne'},
  {t:'AEO',n:'American Eagle Outfitters Inc'},{t:'SEZL',n:'Sezzle Inc'},{t:'MCHP',n:'Microchip Technology'},{t:'UPXI',n:'Upexi Inc'},{t:'CEG',n:'Constellation Energy Corp'},{t:'CNC',n:'Centene Corp'},
  {t:'INOD',n:'Innodata Inc.'},{t:'KSS',n:'Kohl\'s Corp.'},{t:'CDNL',n:'Cardinal Infrastructure'},{t:'KDP',n:'Keurig Dr Pepper Inc'},{t:'XPER',n:'Xperi Inc'},{t:'COHR',n:'Coherent Inc'},
  {t:'BTG',n:'B2Gold Corp'},{t:'DIDIY',n:'DiDi Global Inc'},{t:'PAVS',n:'Paranovus Entertainment Techno'},{t:'GM',n:'General Motors share'},{t:'WWR',n:'Westwater Resources Inc'},{t:'GME',n:'GameStop Corp.'},
  {t:'SRE',n:'Sempra Energy'},{t:'BEAT',n:'BioTelemetry Inc'},{t:'ERO',n:'ERO Copper Corp'},{t:'TRGP',n:'Targa Resources Corp.'},{t:'METC',n:'RAMACO RESOURCES INC'},{t:'ON',n:'ON Semiconductor Corp'},
  {t:'TEM',n:'Tempus AI'},{t:'TEAM',n:'Atlassian Corp'},{t:'AZI',n:'Autozi Internet Technology Global Ltd'},{t:'D',n:'Dominion Resources'},{t:'ACHC',n:'ACADIA HEALTHCARE CO INC'},{t:'HBAN',n:'Huntington Bancshares'},
  {t:'PLRZ',n:'Polyrizon Ltd'},{t:'FDS',n:'FactSet Research Systems Inc.'},{t:'HIVE',n:'Hive Digital Technologies Ltd'},{t:'NOG',n:'Northern Oil & Gas Inc.'},{t:'VITL',n:'Vital Farms Inc'},{t:'GRAB',n:'Grab Holdings Ltd'},
  {t:'AS',n:'Amer Sports, Inc.'},{t:'AMWL',n:'AMERICAN WELL CORP-CLASS A'},{t:'JANX',n:'Janux Therapeutics Inc'},{t:'ENGS',n:'Energys Group Ltd'},{t:'OBDC',n:'Blue Owl Capital Corp'},{t:'HPQ',n:'Hewlett-Packard'},
  {t:'BIIB',n:'BIOGEN IDEC Inc.'},{t:'LAC',n:'Lithium Americas Corp'},{t:'ZYXI',n:'Zynex Inc'},{t:'BTM',n:'Bitcoin Depot Inc'},{t:'SATS',n:'ECHOSTAR COR'},{t:'DVN',n:'Devon Energy Corp.'},
  {t:'AES',n:'AES Corp'},{t:'HD',n:'Home Depot'},{t:'DXCM',n:'DexCom Inc'},{t:'DECK',n:'Deckers Outdoor Corp'},{t:'BB',n:'BlackBerry Ltd'},{t:'GLSI',n:'Greenwich Lifesciences Inc'},
  {t:'MIST',n:'Milestone Pharmaceuticals Inc'},{t:'ABTC',n:'AMERICAN BITCOIN CORP'},{t:'LOGC',n:'CONTEXTLOGIC INC - A'},{t:'TRP',n:'TC Energy Corp'},{t:'LEU',n:'Centrus Energy Corp (A)'},{t:'KULR',n:'Kulr Technology Group Inc'},
  {t:'ASAN',n:'Asana Inc'},{t:'SSRM',n:'SSR Mining Inc'},{t:'SRPT',n:'Sarepta Therapeutics Inc'},{t:'COUR',n:'Coursera Inc.'},{t:'EPAM',n:'EPAM Systems Inc'},{t:'ZTS',n:'Zoetis Inc.'},
  {t:'MRVI',n:'Maravai LifeSciences'},{t:'AIRE',n:'REALPHA TECH CORP'},{t:'ROKU',n:'Roku Inc'},{t:'ASPI',n:'ASP Isotopes Inc'},{t:'MDLZ',n:'Mondelez International, Inc.'},{t:'DASH',n:'Doordash'},
  {t:'CAPR',n:'Capricor Therapeutics Inc'},{t:'KOS',n:'Kosmos Energy Ltd.'},{t:'LVO',n:'LIVEONE INC'},{t:'DXYZ',n:'Destiny Tech100 Inc'},{t:'EQX',n:'Equinox Gold Corp'},{t:'CGEN',n:'Compugen Ltd'},
  {t:'GIS',n:'General Mills'},{t:'WAY',n:'Waystar Holding Corp'},{t:'GLXY',n:'Galaxy Digital Inc'},{t:'LITE',n:'Lumentum Holdings Inc'},{t:'IOT',n:'Samsara Inc'},{t:'NRSN',n:'NeuroSense Therapeutics Ltd'},
  {t:'BMRN',n:'BIOMARIN PHARMACEUTICAL Inc'},{t:'SEDG',n:'SolarEdge Technologies Inc'},{t:'CFLT',n:'Confluent Inc'},{t:'IVR',n:'INVESCO MORTGAGE CAPITAL INC'},{t:'OUST',n:'Ouster Inc'},{t:'PCSA',n:'Processa Pharmaceuticals Inc'},
  {t:'VOYG',n:'Voyager Technologies'},{t:'NRGV',n:'Energy Vault Holdings Inc'},{t:'DVLT',n:'Datavault AI Inc'},{t:'FRSH',n:'Freshworks'},{t:'PSTG',n:'Pure Storage Inc'},{t:'BEAM',n:'Beam Therapeutics Inc'},
  {t:'MNTS',n:'Momentus Inc'},{t:'ABBV',n:'AbbVie Inc.'},{t:'BLK',n:'Blackrock'},{t:'AMCR',n:'AMCOR PLC'},{t:'ACB',n:'AURORA CANNABIS'},{t:'HRTX',n:'Heron Therapeutics Inc'},
  {t:'DOW',n:'Dow Chemical'},{t:'ANVS',n:'ANNOVIS BIO'},{t:'LEN',n:'Lennar Corp.'},{t:'EL',n:'Estee Lauder Cos.'},{t:'CSIQ',n:'Canadian Solar Inc. ADS'},{t:'PRM',n:'Perimeter Solutions SA'},
  {t:'LIN',n:'LINDE PLC'},{t:'POET',n:'POET Technologies Inc'},{t:'APO',n:'Apollo Global Management LLC'},{t:'SHEL',n:'Shell plc'},{t:'VMAR',n:'VISION MARINE TECHNOLOGIES'},{t:'GAU',n:'Galiano Gold'},
  {t:'ETN',n:'Eaton Corp.'},{t:'FAST',n:'Fastenal Co'},{t:'TSN',n:'Tyson Foods'},{t:'ARTV',n:'Artiva Biotherapeutics Inc'},{t:'CRSP',n:'Crispr Therapeutics AG'},{t:'AMT',n:'American Tower Corp A'},
  {t:'FLY',n:'Firefly Aerospace Inc'},{t:'DXC',n:'DXC Technology Co'},{t:'STIM',n:'Neuronetics Inc'},{t:'TWG',n:'Top Wealth Group Holding Ltd'},{t:'TDOC',n:'Teladoc Inc'},{t:'AMKR',n:'Amkor Technology Inc'},
  {t:'SEGG',n:'Lottery.com Inc'},{t:'INTU',n:'Intuit Inc'},{t:'COMM',n:'CommScope Holding Co Inc'},{t:'PGY',n:'PAGAYA TECHNOLOGIES LTD'},{t:'TTAN',n:'ServiceTitan'},{t:'PLAY',n:'Dave & Busters Entertainment Inc'},
  {t:'PSIX',n:'POWER SOLUTIONS INTERNATIONA'},{t:'BSY',n:'BENTLEY SYSTEMS INC'},{t:'NUE',n:'Nucor Corp.'},{t:'SKYT',n:'SkyWater Technology Inc'},{t:'ARDX',n:'Ardelyx, Inc.'},{t:'QURE',n:'uniQure NV'},
  {t:'NKTR',n:'Nektar Therapeutics Inc'},{t:'ABVX',n:'Abivax SA (ABVX@SBF)'},{t:'CLF',n:'Cleveland-Cliffs Inc'},{t:'BIRK',n:'Birkenstock Holding Plc'},{t:'AEVA',n:'AEVA TECHNOLOGIES INC'},{t:'EIX',n:'Edison International'},
  {t:'FIX',n:'Comfort Systems USA IncShs'},{t:'VSME',n:'VS MEDIA Holdings Ltd'},{t:'GT',n:'Goodyear Tire & Rubber'},{t:'SOC',n:'SABLE OFFSHORE CORP'},{t:'W',n:'Wayfair Inc'},{t:'BYRN',n:'Byrna Technologies Inc'},
  {t:'MSGY',n:'MASONGLORY LTD'},{t:'HSDT',n:'Helius Medical Technologies Inc'},{t:'NGD',n:'New Gold Inc.'},{t:'ARLO',n:'Arlo Technologies'},{t:'RYAN',n:'Ryan Specialty Group Holdings Inc'},{t:'NNE',n:'NANO Nuclear Energy Inc'},
  {t:'REVB',n:'REVELATION BIOSCIENCES INC'},{t:'SG',n:'	Sweetgreen Inc'},{t:'HXHX',n:'Haoxin Holdings Ltd'},{t:'CAVA',n:'CAVA GROUP INC'},{t:'SANA',n:'Sana Biotechnology'},{t:'GOVX',n:'Geovax Labs Inc'},
  {t:'APH',n:'Amphenol Corp A'},{t:'CMBT',n:'EURONAV NV'},{t:'COO',n:'The Cooper Companies Inc'},{t:'BETA',n:'BETA Technologies'},{t:'ENVB',n:'Enveric Biosciences Inc'},{t:'OXSQ',n:'Oxford Square Capital Corp'},
  {t:'KYIV',n:'KYIVSTAR GROUP LTD'},{t:'MNDY',n:'Monday.Com Ltd'},{t:'GMAB',n:'Genmab A/S'},{t:'BHVN',n:'Biohaven Pharmaceutical Holding Co Ltd'},{t:'CPNG',n:'Coupang'},{t:'WFC',n:'Wells Fargo'},
  {t:'LFST',n:'LifeStance Health Group Inc'},{t:'CGEM',n:'CULLINAN MANAGEMENT INC'},{t:'PLCE',n:'Children\'s Place Retail Stores Inc.'},{t:'RGNX',n:'REGENXBIO Inc'},{t:'OWL',n:'Blue Owl Capital Inc'},{t:'PMCB',n:'PharmaCyte Biotech Inc'},
  {t:'STZ',n:'Constellation Brands'},{t:'FLYE',n:'FLY-E Group Inc'},{t:'DUK',n:'Duke Energy Corp'},{t:'EVTL',n:'Vertical Aerospace Ltd'},{t:'REGN',n:'Regeneron Pharmaceuticals Inc.'},{t:'UTI',n:'Universal Technical Institute Inc'},
  {t:'KURA',n:'	Kura Oncology Inc'},{t:'VELO',n:'VELO3D INC'},{t:'DEFT',n:'Defi Technologies Inc'},{t:'AMPX',n:'Amprius Technologies Inc'},{t:'TRMD',n:'TORM PLC'},{t:'ABEO',n:'Abeona Therapeutics Inc.'},
  {t:'BKKT',n:'Bakkt Holdings Inc'},{t:'RZLV',n:'Rezolve AI Ltd'},{t:'VOR',n:'Vor Biopharma'},{t:'PSEC',n:'Prospect Capital share'},{t:'MIGI',n:'Mawson Infrastructure Group In'},{t:'FDX',n:'FedEx Corporation'},
  {t:'ISSC',n:'Innovative Solutions and Support IncShs'},{t:'ABT',n:'Abbott Laboratories'},{t:'HROW',n:'HARROW HEALTH INC'},{t:'BLSH',n:'Bullish'},{t:'ALLY',n:'ALLY FINANCIAL INC'},{t:'IRM',n:'Iron Mountain Incorporated'},
  {t:'LMND',n:'Lemonade Inc.'},{t:'CHWY',n:'Chewy'},{t:'BX',n:'The Blackstone Group L.P.'},{t:'HRZN',n:'HORIZON TECHNOLOGY FIN CORP'},{t:'TMDX',n:'TRANSMEDICS GROUP INC'},{t:'ADP',n:'Automatic Data Processing'},
  {t:'BLNK',n:'Blink Charging Co'},{t:'WAB',n:'Wabtec'},{t:'IIPR',n:'Innovative Industrial Properties Inc'},{t:'OMC',n:'Omnicom Group'},{t:'URNJ',n:'Sprott Junior Uranium Miners ETF'},{t:'GRRR',n:'GRRR'},
  {t:'PSNL',n:'Personalis Inc'},{t:'BTU',n:'Peabody Energy'},{t:'LW',n:'Lamb Weston Holdings Inc'},{t:'MDT',n:'Medtronic Inc.'},{t:'GLDG',n:'GoldMining Inc'},{t:'KIM',n:'Kimco Realty'},
  {t:'PENN',n:'Penn National Gaming Inc.'},{t:'DT',n:'Dynatrace Holdings'},{t:'APPS',n:'DIGITAL TURBINE INC'},{t:'CTRA',n:'COTERRA ENERGY INC'},{t:'CETY',n:'Clean Energy Technologies Inc'},{t:'WKHS',n:'WORKHORSE GROUP INC'},
  {t:'IBIO',n:'IBIO INC'},{t:'BRKR',n:'Bruker Corp'},{t:'HTGC',n:'Hercules Technology Growth Capital IncShs'},{t:'STAG',n:'STAG INDUSTRIAL INC'},{t:'AAOI',n:'Applied Optoelectronics, Inc.'},{t:'AEM',n:'Agnico Eagle Mines Limited'},
  {t:'CENX',n:'Century Aluminum Co'},{t:'HESM',n:'Hess Midstream LP'},{t:'DHI',n:'D. R. Horton'},{t:'KTTA',n:'Pasithea Therapeutics Corp'},{t:'VSAT',n:'Viasat Inc'},{t:'AGI',n:'ALAMOS GOLD INC-CLASS A'},
  {t:'ALKT',n:'Alkami Technology inc'},{t:'TXN',n:'Texas Instruments'},{t:'PSKY',n:'Paramount Skydance Corp'},{t:'AMGN',n:'Amgen Inc'},{t:'SYNA',n:'Synaptics Incorporated'},{t:'SPRY',n:'ARS Pharmaceuticals Inc'},
  {t:'DE',n:'DEERE & CO'},{t:'WM',n:'Waste Management Inc.'},{t:'BMEA',n:'Biomea Fusion Inc'},{t:'ITRG',n:'INTEGRA RESOURCES CORP'},{t:'NRG',n:'NRG Energy'},{t:'DAVE',n:'Dave Inc'},
  {t:'CIEN',n:'Ciena Corp'},{t:'VFC',n:'V.F. Corp.'},{t:'DBRG',n:'DIGITALBRIDGE GROUP INC'},{t:'ETOR',n:'eToro'},{t:'IRDM',n:'Iridium Communications Inc'},{t:'DNN',n:'Denison Mines Corp'},
  {t:'CTM',n:'Castellum Inc'},{t:'AEHL',n:'Antelope Enterprise Holdings Limited'},{t:'NG',n:'Novagold Resources Inc'},{t:'VOXR',n:'Vox Royalty Corp'},{t:'AIR.EU',n:'Airbus SE'},{t:'TSCO',n:'Tractor Supply Co.'},
  {t:'MS',n:'Morgan Stanley'},{t:'MLTX',n:'MoonLake Immunotherapeutics'},{t:'PD',n:'PagerDuty Inc'},{t:'BN',n:'Brookfield Corp'},{t:'RTX',n:'Raytheon Technologies Corp'},{t:'WOK',n:'WORK Medical Technology Group Ltd'},
  {t:'SPGI',n:'SPGI'},{t:'AXP',n:'American Express Co'},{t:'COSM',n:'Cosmos Holdings Inc'},{t:'DX',n:'Dynex Capital Inc'},{t:'ACXP',n:'Acurx Pharmaceuticals Inc'},{t:'KLAR',n:'Klarna Group plc'},
  {t:'APA',n:'Apache Corporation'},{t:'NEWT',n:'NewtekOne Inc'},{t:'CLOV',n:'CLOVER HEALTH INVESTMENTS CORP'},{t:'MYO',n:'Myomo Inc'},{t:'TE',n:'T1 Energy Inc'},{t:'WMB',n:'Williams Cos.'},
  {t:'HLT',n:'Hilton Worldwide Holdings Inc'},{t:'GS',n:'Goldman Sachs Group'},{t:'KMB',n:'Kimberly-Clark'},{t:'SIRI',n:'Sirius XM Holding Inc'},{t:'FSM',n:'FORTUNA MINING CORP'},{t:'NLY',n:'Annaly Capital Management share'},
  {t:'AMC',n:'AMC Entertainment Holdings Inc'},{t:'FOUR',n:'Shift4 Payments Inc'},{t:'ARQT',n:'Arcutis Biotherapeutics Inc'},{t:'OLMA',n:'Olema Pharmaceuticals Inc'},{t:'VIR',n:'VIR BIOTECHNOLOGY INC'},{t:'STKS',n:'The One Group Hospitality Inc'},
  {t:'CPB',n:'Campbell Soup'},{t:'WIX',n:'Wix.com Ltd'},{t:'ODD',n:'ODDITY Tech Ltd'},{t:'PSNY',n:'Polestar Automotive Holding UK PLC'},{t:'SILA',n:'Sila Realty Trust Inc'},{t:'LC',n:'LendingClub Corp'},
  {t:'OLPX',n:'Olaplex Holdings Inc'},{t:'AIRS',n:'AirSculpt Technologies, Inc.'},{t:'NDAQ',n:'Nasdaq Inc'},{t:'QH',n:'Quhuo Ltd'},{t:'GAP',n:'Gap Inc-The'},{t:'ETSY',n:'Etsy Inc'},
  {t:'TERN',n:'Terns Pharmaceuticals Inc'},{t:'SGMO',n:'Sangamo Therapeutics, Inc.'},{t:'CODI',n:'Compass Diversified Holdings Shs of Benef Interest'},{t:'WYFI',n:'WhiteFiber'},{t:'FLYW',n:'Flywire Corporation'},{t:'SLM',n:'SLM Corporation'},
  {t:'UCTT',n:'Ultra Clean Holdings Inc'},{t:'GCT',n:'GigaCloud Technology Inc'},{t:'DXPE',n:'DXP Enterprises Inc.'},{t:'BALL',n:'BALL CORP'},{t:'CTXR',n:'Citius Pharmaceuticals Inc'},{t:'JACK',n:'Jack in the Box Inc.'},
  {t:'CARR',n:'Carrier Global Corp'},{t:'WBUY',n:'Webuy Global Ltd'},{t:'HOG',n:'Harley-Davidson'},{t:'TNXP',n:'Tonix Pharmaceuticals Holding Corp'},{t:'NBY',n:'NovaBay Pharmaceuticals, Inc.'},{t:'CAKE',n:'CHEESECAKE FACTORY INC-THE'},
  {t:'GILD',n:'Gilead Sciences'},{t:'PAYO',n:'Payoneer Global Inc'},{t:'IDT',n:'IDT Corp'},{t:'KITT',n:'Nauticus Robotics Inc'},{t:'AVAV',n:'AeroVironment Inc.'},{t:'VERI',n:'Veritone Inc'},
  {t:'HBM',n:'Hudbay Minerals Inc'},{t:'ALDX',n:'Aldeyra Therapeutics Inc'},{t:'INMB',n:'INmune Bio Inc'},{t:'SFD',n:'Smithfield Foods Inc'},{t:'BDRX',n:'Biodexa Pharmaceuticals Plc'},{t:'WTI',n:'W&T Offshore, Inc.'},
  {t:'ETON',n:'Eton Pharmaceuticals Inc'},{t:'INTR',n:'Inter & Co Inc'},{t:'HAFN',n:'HAFNIA LTD'},{t:'AVAH',n:'Aveanna Healthcare Holdings Inc'},{t:'FATE',n:'Fate Therapeutics Inc'},{t:'CWAN',n:'Clearwater Analytics Holdings Inc'},
  {t:'JHG',n:'Janus Henderson Group PLC'},{t:'ACMR',n:'ACM Research Inc Registered Shs -A'},{t:'GOSS',n:'Gossamer Bio Inc'},{t:'ALLT',n:'Allot Ltd. - Ordinary Shares'},{t:'FOLD',n:'Amicus Therapeutics Inc'},{t:'WDAY',n:'Workday'},
  {t:'TDW',n:'Tidewater Inc.'},{t:'TU',n:'TELUS Corp'},{t:'AAON',n:'AAON, Inc.'},{t:'GPN',n:'	GLOBAL PAYMENTS INC'},{t:'ATCH',n:'AtlasClear Holdings Inc'},{t:'WPM',n:'Wheaton Precious Metals Corp.'},
  {t:'TASK',n:'TaskUS Inc'},{t:'MGM',n:'MGM Resorts International'},{t:'ACVA',n:'ACV Auctions Inc'},{t:'SONN',n:'Sonnet BioTherapeutics Holding'},{t:'MASK',n:'3 E Network Technology Group Ltd'},{t:'ATRA',n:'Atara Biotherapeutics Inc'},
  {t:'SRTS',n:'Sensus Healthcare Inc'},{t:'CHTR',n:'Charter Communications Inc.'},{t:'TGTX',n:'TG Therapeutics, Inc.'},{t:'CRH',n:'CRH PLC'},{t:'PYXS',n:'Pyxis Oncology Inc'},{t:'DNUT',n:'Krispy Kreme Inc'},
  {t:'UP',n:'Wheels Up'},{t:'VTGN',n:'VistaGen Therapeutics Inc'},{t:'ADSK',n:'Autodesk Inc'},{t:'MAGH',n:'Magnitude International Ltd'},{t:'DBI',n:'DESIGNER BRANDS INC'},{t:'HST',n:'Host Hotels & Resorts'},
  {t:'SRAD',n:'SPORTRADAR GROUP AG'},{t:'RPRX',n:'ROYALTY PHARMA PLC'},{t:'VRNS',n:'Varonis System Inc'},{t:'RH',n:'RESTORATION HDW'},{t:'EBC',n:'EASTERN BANKSHARES INC'},{t:'VENU',n:'Venu Holding Corp'},
  {t:'NOG.EU',n:'NOSTRUM OIL & GAS'},{t:'PETS',n:'PetMed Express Inc'},{t:'SAR',n:'Saratoga Investment Corp'},{t:'EQT',n:'EQT Corporation'},{t:'PLAB',n:'Photronics Inc.'},{t:'BBGI',n:'Beasley Broadcast Group, Inc'},
  {t:'CHYM',n:'Chime Financial'},{t:'AXTI',n:'AXT Inc'},{t:'USB',n:'U.S. Bancorp'},{t:'BTTC',n:'Black Titan Corp'},{t:'EGO',n:'Eldorado Gold Corp'},{t:'QSI',n:'QUANTUM-SI INC'},
  {t:'CRSR',n:'Corsair Gaming, Inc.'},{t:'ABUS',n:'Arbutus Biopharma Corp'},{t:'TTMI',n:'TTM Technologies, Inc.'},{t:'NE',n:'Noble Corp'},{t:'BTCT',n:'BTC Digital Ltd'},{t:'GOCO',n:'GoHealth'},
  {t:'HON',n:'Honeywell Int\'l Inc.'},{t:'CTAS',n:'Cintas Corporation'},{t:'CDNS',n:'Cadence Design Systems Inc'},{t:'GORO',n:'Gold Resource Corp'},{t:'BKSY',n:'BlackSky Technology Inc'},{t:'KMI',n:'Kinder Morgan Inc.'},
  {t:'ALGS',n:'Aligos Therapeutics Inc'},{t:'EXFY',n:'Expensify Inc'},{t:'LUMN',n:'Lumen Technologies Inc'},{t:'NCPL',n:'Netcapital Inc'},{t:'SVM',n:'Silvercorp Metals Inc'},{t:'SGBX',n:'SG BLOCKS INC'},
  {t:'KYTX',n:'Kyverna Therapeutics Inc.'},{t:'URBN',n:'Urban Outfitters'},{t:'SFL',n:'SFL Corp Ltd'},{t:'VTYX',n:'Ventyx Biosciences Inc'},{t:'PALI',n:'Palisade Bio Inc'},{t:'WRN',n:'Western Copper and Gold Corp'},
  {t:'PCG',n:'PG&E Corp.'},{t:'EOG',n:'EOG Resources'},{t:'IOVA',n:'Lion Biotechnologies Inc Registered Shs'},{t:'ATPC',n:'Agape ATP Corp'},{t:'GLBE',n:'Global-E Online Ltd'},{t:'ENTG',n:'Entegris Inc.'},
  {t:'ASML.EU',n:'ASML Holding'},{t:'TMQ',n:'Trilogy Metals Inc'},{t:'SNDL',n:'Sundial Growers Inc'},{t:'ARWR',n:'Arrowhead Pharmaceuticals, Inc.'},{t:'BCRX',n:'BioCryst Pharmaceuticals Inc'},{t:'ARCT',n:'ARCTURUS THERAPEUTICS HOLDINGS INC'},
  {t:'HLF',n:'Herbalife share'},{t:'FIVN',n:'Five9 Inc'},{t:'APG',n:'API GROUP CORP'},{t:'FJET',n:'Starfighters Space Inc'},{t:'ULTA',n:'Ulta Salon Cosmetics & Fragrance Inc.'},{t:'PHR',n:'Phreesia Inc'},
  {t:'WFRD',n:'Weatherford International PLC'},{t:'SGHC',n:'Super Group SGHC Ltd'},{t:'PSQH',n:'PSQ Holdings Inc'},{t:'CHPT',n:'ChargePoint Holdings Inc'},{t:'CTKB',n:'Cytek BioSciences, Inc.'},{t:'FLG',n:'Flagstar Financial Inc'},
  {t:'INCY',n:'Incyte Corp.'},{t:'VRTX',n:'Vertex Pharmaceuticals Incorporated'},{t:'ATHA',n:'Athira Pharma'},{t:'NAKA',n:'Kindly MD Inc'},{t:'XCUR',n:'Exicure Inc'},{t:'EW',n:'Edwards Lifesciences'},
  {t:'UAA',n:'Under Armour Inc A'},{t:'FE',n:'FirstEnergy Corp'},{t:'CRGY',n:'Crescent Energy Inc'},{t:'CRGO',n:'CRGO'},{t:'SFM',n:'Sprouts Farmers Market Inc'},{t:'MMI',n:'Marcus & Millichap Inc'},
  {t:'DD',n:'Du Pont (E.I.)'},{t:'DDD',n:'3D Systems share'},{t:'NEWP',n:'NEW PACIFIC METALS CORP'},{t:'AVNW',n:'Aviat Networks, Inc. - Common Stock'},{t:'KKR',n:'KKR & Co. L.P.'},{t:'TXG',n:'10X GENOMICS INC'},
  {t:'RC',n:'READY CAPITAL CORP'},{t:'OCGN',n:'Ocugen Inc'},{t:'GSBD',n:'Goldman Sachs BDC Inc'},{t:'INMD',n:'InMode Ltd'},{t:'LEVI',n:'LEVI STRAUSS & CO'},{t:'ISRG',n:'Intuitive Surgical Inc.'},
  {t:'ARBK',n:'Argo Blockchain PLC'},{t:'OR',n:'OR Royalties Inc'},{t:'SAVA',n:'CASSAVA SCIENCES INC'},{t:'PSTV',n:'PLUS THERAPEUTICS INC'},{t:'CBLL',n:'Ceribell'},{t:'LENZ',n:'LENZ Therapeutics Inc'},
  {t:'PLD',n:'ProLogis'},{t:'MVST',n:'Microvast Holdings Inc'},{t:'VERA',n:'Vera Therapeutics Inc'},{t:'ICE',n:'IntercontinentalExchange Inc.'},{t:'AMTM',n:'Amentum Holdings Inc'},{t:'GEN',n:'Gen Digital Inc'},
  {t:'GSL',n:'Global Ship Lease Inc'},{t:'IMRX',n:'IMMUNEERING CORP'},{t:'MOH',n:'Molina Healthcare Inc.'},{t:'CRMD',n:'CorMedix Inc'},{t:'BKR',n:'Baker Hughes Co'},{t:'HRL',n:'Hormel Foods Corp.'},
  {t:'NMFC',n:'NEW MTN FIN CORP'},{t:'SA',n:'Seabridge Gold IncShs'},{t:'LGHL',n:'LION GROUP HOLDING LTD'},{t:'CAG',n:'ConAgra Foods Inc.'},{t:'ENB',n:'Enbridge Inc'},{t:'TER',n:'Teradyne Inc.'},
  {t:'ALMS',n:'Alumis Inc'},{t:'SYY',n:'Sysco Corp.'},{t:'QTRX',n:'Quanterix Corp'},{t:'RVPH',n:'Reviva Pharmaceuticals Holdings Inc'},{t:'ASM',n:'Avino Silver & Gold Mines Ltd. Common Shares (Canada)'},{t:'SYK',n:'Stryker Corp.'},
  {t:'CART',n:'Maplebear Inc.'},{t:'TPR',n:'Tapestry Inc'},{t:'EXPE',n:'Expedia Inc.'},{t:'LEG',n:'Leggett & Platt'},{t:'ALLO',n:'Allogene Therapeutics Inc'},{t:'GAIA',n:'Gaia Inc (A)'},
  {t:'CALM',n:'Cal-Maine Foods Inc.'},{t:'TPVG',n:'Triplepoint Venture Growth BDC Corp'},{t:'NTSK',n:'Netskope One'},{t:'UFG',n:'Uni-Fuels Holdings Ltd'},{t:'CYPH',n:'Cypherpunk Technologies Inc'},{t:'KD',n:'Kyndryl Holdings Inc'},
  {t:'XP',n:'XP Inc'},{t:'MNST',n:'Monster Beverage Corporation'},{t:'CNK',n:'CINEMARK HOLDINGS INC'},{t:'ABCL',n:'AbCellera Biologics'},{t:'WOLF',n:'Wolfspeed Inc'},{t:'RANI',n:'Rani Therapeutics Holdings Inc'},
  {t:'LAR',n:'Lithium Argentina AG'},{t:'STEX',n:'Streamex Corp'},{t:'OABI',n:'OmniAb Inc'},{t:'TRIN',n:'TRINITY CAPITAL INC'},{t:'VNDA',n:'Vanda Pharmaceuticals Inc'},{t:'WEN',n:'Wendys International Inc.'},
  {t:'TIGO',n:'Millicom International Cellular SA'},{t:'VINP',n:'Vinci Partners Investments Ltd'},{t:'AGX',n:'Argan Inc'},{t:'AR',n:'Antero Resources Corp'},{t:'VNOM',n:'Viper Energy Partners LP Partnership Units'},{t:'HTZ',n:'Hertz Global Holdings, Inc'},
  {t:'OTEX',n:'Open Text Corp'},{t:'RJF',n:'	Raymond James Financial Inc'},{t:'MAIA',n:'MAIA Biotechnology Inc'},{t:'PVH',n:'PVH Corp'},{t:'SRFM',n:'Surf Air Mobility Inc'},{t:'ENR.EU',n:'SIEMENS ENERGY'},
  {t:'FTEL',n:'Fitell Corp'},{t:'TT',n:'Trane Technologies plc'},{t:'PACB',n:'Pacific Biosciences of California Inc'},{t:'QMCO',n:'Quantum Corp'},{t:'VIVK',n:'Vivakor Inc'},{t:'TENB',n:'TENABLE HOLDINGS INC'},
  {t:'MPWR',n:'Monolithic Power Systems Inc'},{t:'ARMN',n:'Aris Mining Corp'},{t:'USAS',n:'Americas Silver Corp'},{t:'PBF',n:'PBF Energy Inc'},{t:'PK',n:'Park Hotels & Resorts Inc.'},{t:'ALIT',n:'ALIGHT INC'},
  {t:'L',n:'Loews Corp.'},{t:'SILO',n:'Silo Pharma Inc'},{t:'MKC',n:'McCormick & Co.'},{t:'FIGR',n:'Figure Technology Solutions, Inc.'},{t:'NCNO',n:'nCino Inc'},{t:'FLEX',n:'FLEX LTD'},
  {t:'CYTK',n:'Cytokinetics Inc'},{t:'SLDE',n:'Slide Insurance Holdings Inc'},{t:'TALK',n:'TALKSPACE INC'},{t:'RXT',n:'Rackspace Technology Inc'},{t:'EXE',n:'Expand Energy Corp'},{t:'ATRC',n:'AtriCure Inc.'},
  {t:'UBS',n:'UBS GROUP AG'},{t:'STRL',n:'Sterling Construction Company Inc'},{t:'AXIL',n:'AXIL Brands Inc'},{t:'AUR',n:'Aurora Innovation Inc'},{t:'KVUE',n:'Kenvue Inc'},{t:'TKNO',n:'Alpha Teknova Inc'},
  {t:'A',n:'Agilent Technologies Inc'},{t:'VET',n:'Vermilion Energy Inc'},{t:'DNLI',n:'Denali Therapeutics Inc'},{t:'SKYH',n:'Sky Harbour Group Corp'},{t:'DSP',n:'Viant Technology Inc'},{t:'ALL',n:'Allstate Corp'},
  {t:'KARO',n:'Karooooo Ltd'},{t:'FROG',n:'Jfrog Ltd'},{t:'XZO',n:'Exzeo Group'},{t:'BSX',n:'Boston Scientific'},{t:'CSTM',n:'Constellium Nv'},{t:'GLW',n:'Corning Inc.'},
  {t:'EFC',n:'ELLINGTON FINL LLC'},{t:'CFG',n:'Citizens Financial Group Inc'},{t:'SBLK',n:'Star Bulk Carriers Corp.'},{t:'ONTO',n:'ONTO INNOVATION INC'},{t:'AREC',n:'American Resources Corp'},{t:'ACLS',n:'Axcelis Technologies Inc'},
  {t:'HUM',n:'Humana Inc.'},{t:'URG',n:'UR-ENERGY INC'},{t:'EDHL',n:'Everbright Digital Holding Ltd'},{t:'LFVN',n:'Lifevantage Corp'},{t:'SPWR',n:'SunPower Corporation'},{t:'ATOS',n:'Atossa Genetics Inc'},
  {t:'PLG',n:'Platinum Group Metals Ltd'},{t:'VCYT',n:'Veracyte Inc'},{t:'JBS',n:'JBS NV'},{t:'VTEX',n:'VTEX'},{t:'DAR',n:'Darling Ingredients Inc'},{t:'TOI',n:'Oncology Institute Inc-The'},
  {t:'TECK',n:'Teck Resources Ltd'},{t:'COMP',n:'Compass Inc'},{t:'CMPX',n:'COMPASS THERAPEUTICS INC'},{t:'BLND',n:'Blend Labs Inc'},{t:'DHR',n:'Danaher Corp.'},{t:'KLAC',n:'KLA-Tencor Corp.'},
  {t:'SKYW',n:'SkyWest Inc.'},{t:'ELV',n:'Elevance Health Inc'},{t:'NXPI',n:'NXP Semiconductors share'},{t:'EXOD',n:'Exodus Movement Inc'},{t:'ALGN',n:'Align Technology Inc.'},{t:'ATLX',n:'Atlas Lithium Inc'},
  {t:'SONO',n:'Sonos Inc'},{t:'BBY',n:'Best Buy Co. Inc.'},{t:'EHTH',n:'eHealth Inc.'},{t:'SEI',n:'Solaris Energy Infrastructure'},{t:'BIVI',n:'Biovie Inc'},{t:'SCHW',n:'Charles Schwab'},
  {t:'TSSI',n:'TSS Inc'},{t:'CI',n:'Cigna Group'},{t:'RHI',n:'Robert Half International'},{t:'STNE',n:'StoneCo Ltd'},{t:'PACS',n:'PACS Group'},{t:'AXGN',n:'Axogen Inc'},
  {t:'PMN',n:'ProMIS Neurosciences Inc'},{t:'NKLR',n:'Terra Innovatum Global N.V.'},{t:'HGBL',n:'HERITAGE GLOBAL INC'},{t:'NAVN',n:'Navan'},{t:'ITT',n:'ITT Inc'},{t:'TDC',n:'Teradata Corp.'},
  {t:'GOOD',n:'Gladstone Commercial Corp'},{t:'DPZ',n:'Dominos Pizza Inc.'},{t:'BHC',n:'BAUSCH HEALTH COS INC'},{t:'OWLT',n:'Owlet Inc'},{t:'ASTI',n:'Ascent Solar Technologies Inc'},{t:'BLLN',n:'BillionToOne'},
  {t:'YOU',n:'Clear Secure Inc'},{t:'VRAX',n:'Virax Biolabs Group Ltd'},{t:'INVA',n:'Theravance Inc'},{t:'BFLY',n:'BUTTERFLY NETWORK INC'},{t:'ZENA',n:'ZenaTech Inc'},{t:'CTGO',n:'Contango ORE Inc'},
  {t:'NRIX',n:'Nurix Therapeutics'},{t:'MGNI',n:'MAGNITE INC'},{t:'HCWB',n:'HCW Biologics Inc'},{t:'NTAP',n:'NetApp'},{t:'FLO',n:'Flowers Foods Inc'},{t:'GWRS',n:'GLOBAL WATER RESOURCES INC'},
  {t:'SEMR',n:'SEMrush Holdings, Inc.'},{t:'PUMP',n:'ProPetro Holding Corp'},{t:'ETHZ',n:'ETHZilla Corp'},{t:'NXDR',n:'Nextdoor Holdings Inc'}
];

function openTickersModal() {
  document.getElementById('tickersModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.location.hash !== '#stocks') {
    history.pushState(null, '', '#stocks');
  }
  filterTickers();
}
function closeTickersModal() {
  document.getElementById('tickersModal').classList.remove('open');
  document.body.style.overflow = '';
  if (window.location.hash === '#stocks') {
    history.pushState(null, '', window.location.pathname + window.location.search);
  }
}
document.getElementById('tickersModal').addEventListener('click', function(e) {
  if (e.target === this) closeTickersModal();
});
// Support legacy query param
if (new URLSearchParams(window.location.search).get('tickers') === 'open') {
  openTickersModal();
}
// Open via hash on load
if (window.location.hash === '#stocks') {
  openTickersModal();
}

function filterTickers() {
  var q = (document.getElementById('tickerSearch').value || '').toLowerCase();
  var filtered = q ? tickers.filter(function(t) { return t.t.toLowerCase().includes(q) || t.n.toLowerCase().includes(q); }) : tickers;
  var list = document.getElementById('tickerList');
  var isRu = document.cookie.indexOf('pb_lang_manual=ru') !== -1 || document.cookie.indexOf('googtrans=/en/ru') !== -1;
  document.getElementById('tickersCount').textContent = isRu
    ? ('В наличии ' + filtered.length + ' из ' + tickers.length + ' акций.')
    : (filtered.length + ' of ' + tickers.length + ' stocks available.');
  list.innerHTML = filtered.map(function(t) {
    return '<div class="ticker-row">' +
      '<div class="ticker-info"><strong>' + t.t + '</strong> <span>' + t.n + '</span></div>' +
      '<a href="https://tap.freedom24.com/to/chat/ai?text=/buy ' + t.t + ' 10&utm_source=ai_game_site&utm_medium=web&utm_campaign=portfolio_battle_s1&utm_content=tickers_modal" target="_blank" rel="noopener" class="ticker-buy">Buy 10</a>' +
    '</div>';
  }).join('');
}
