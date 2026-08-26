// 公开回退数据：不包含成本。正常情况下商品会从 Supabase 云端读取。
const defaultProducts = [
  {
    "id": 1,
    "code": "SM5",
    "name": "Semaglutide",
    "spec": "5mg*10vials",
    "price": 35,
    "cost": 0
  },
  {
    "id": 2,
    "code": "SM10",
    "name": "Semaglutide",
    "spec": "10mg*10vials",
    "price": 65,
    "cost": 0
  },
  {
    "id": 3,
    "code": "SM15",
    "name": "Semaglutide",
    "spec": "15mg*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 4,
    "code": "SM20",
    "name": "Semaglutide",
    "spec": "20mg*10vials",
    "price": 100,
    "cost": 0
  },
  {
    "id": 5,
    "code": "SM30",
    "name": "Semaglutide",
    "spec": "30mg*10vials",
    "price": 125,
    "cost": 0
  },
  {
    "id": 6,
    "code": "RT5",
    "name": "Retatrutide",
    "spec": "5mg*10vials",
    "price": 45,
    "cost": 0
  },
  {
    "id": 7,
    "code": "RT10",
    "name": "Retatrutide",
    "spec": "10mg*10vials",
    "price": 85,
    "cost": 0
  },
  {
    "id": 8,
    "code": "RT15",
    "name": "Retatrutide",
    "spec": "15mg*10vials",
    "price": 115,
    "cost": 0
  },
  {
    "id": 9,
    "code": "RT20",
    "name": "Retatrutide",
    "spec": "20mg*10vials",
    "price": 135,
    "cost": 0
  },
  {
    "id": 10,
    "code": "RT30",
    "name": "Retatrutide",
    "spec": "30mg*10vials",
    "price": 185,
    "cost": 0
  },
  {
    "id": 11,
    "code": "RT40",
    "name": "Retatrutide",
    "spec": "40mg*10vials",
    "price": 250,
    "cost": 0
  },
  {
    "id": 12,
    "code": "RT50",
    "name": "Retatrutide",
    "spec": "50mg*10vials",
    "price": 280,
    "cost": 0
  },
  {
    "id": 13,
    "code": "RT60",
    "name": "Retatrutide",
    "spec": "60mg*10vials",
    "price": 320,
    "cost": 0
  },
  {
    "id": 14,
    "code": "RT80",
    "name": "Retatrutide",
    "spec": "80mg*10vials",
    "price": 388,
    "cost": 0
  },
  {
    "id": 15,
    "code": "RT100",
    "name": "Retatrutide",
    "spec": "100mg*10vials",
    "price": 420,
    "cost": 0
  },
  {
    "id": 16,
    "code": "TR5",
    "name": "Tirzepatide",
    "spec": "5mg*10vials",
    "price": 40,
    "cost": 0
  },
  {
    "id": 17,
    "code": "TR10",
    "name": "Tirzepatide",
    "spec": "10mg*10vials",
    "price": 60,
    "cost": 0
  },
  {
    "id": 18,
    "code": "TR15",
    "name": "Tirzepatide",
    "spec": "15mg*10vials",
    "price": 70,
    "cost": 0
  },
  {
    "id": 19,
    "code": "TR20",
    "name": "Tirzepatide",
    "spec": "20mg*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 20,
    "code": "TR30",
    "name": "Tirzepatide",
    "spec": "30mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 21,
    "code": "TR40",
    "name": "Tirzepatide",
    "spec": "40mg*10vials",
    "price": 140,
    "cost": 0
  },
  {
    "id": 22,
    "code": "TR50",
    "name": "Tirzepatide",
    "spec": "50mg*10vials",
    "price": 180,
    "cost": 0
  },
  {
    "id": 23,
    "code": "TR60",
    "name": "Tirzepatide",
    "spec": "60mg*10vials",
    "price": 210,
    "cost": 0
  },
  {
    "id": 24,
    "code": "TR80",
    "name": "Tirzepatide",
    "spec": "80mg*10vials",
    "price": 325,
    "cost": 0
  },
  {
    "id": 25,
    "code": "TR100",
    "name": "Tirzepatide",
    "spec": "100mg*10vials",
    "price": 350,
    "cost": 0
  },
  {
    "id": 26,
    "code": "TR120",
    "name": "Tirzepatide",
    "spec": "120mg*10vials",
    "price": 400,
    "cost": 0
  },
  {
    "id": 27,
    "code": "AR50",
    "name": "AICAR",
    "spec": "50mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 28,
    "code": "AE1",
    "name": "ACE-031",
    "spec": "1mg*10vials",
    "price": 58,
    "cost": 0
  },
  {
    "id": 29,
    "code": "AP2",
    "name": "Adipotide",
    "spec": "2mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 30,
    "code": "AP5",
    "name": "Adipotide",
    "spec": "5mg*10vials",
    "price": 144,
    "cost": 0
  },
  {
    "id": 31,
    "code": "ARA10",
    "name": "ARA290 (Cibinetide)",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 32,
    "code": "ARA16",
    "name": "ARA290 (Cibinetide)",
    "spec": "16mg*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 33,
    "code": "ADA5",
    "name": "Adamax",
    "spec": "5mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 34,
    "code": "ADA10",
    "name": "Adamax",
    "spec": "10mg*10vials",
    "price": 102,
    "cost": 0
  },
  {
    "id": 35,
    "code": "BC2",
    "name": "BPC 157",
    "spec": "2mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 36,
    "code": "BC5",
    "name": "BPC 157",
    "spec": "5mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 37,
    "code": "BC10",
    "name": "BPC 157",
    "spec": "10mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 38,
    "code": "BB10",
    "name": "BPC5mg+TB5mg",
    "spec": "10mg*10vials",
    "price": 110,
    "cost": 0
  },
  {
    "id": 39,
    "code": "BB20",
    "name": "BPC10mg+TB10mg",
    "spec": "20mg*10vials",
    "price": 236,
    "cost": 0
  },
  {
    "id": 40,
    "code": "BBG70",
    "name": "Glow(TB10mg+BPC-15710mg+GHK50mg)",
    "spec": "70mg*10vials",
    "price": 234,
    "cost": 0
  },
  {
    "id": 41,
    "code": "B-12",
    "name": "B-12",
    "spec": "10mg*10vials",
    "price": 33,
    "cost": 0
  },
  {
    "id": 42,
    "code": "B733",
    "name": "B7-33",
    "spec": "2mg*10vials",
    "price": 83,
    "cost": 0
  },
  {
    "id": 43,
    "code": "B73310",
    "name": "B7-33",
    "spec": "10mg*10vials",
    "price": 240,
    "cost": 0
  },
  {
    "id": 44,
    "code": "BT2",
    "name": "TB500(Thymosin B4 Acetate)",
    "spec": "2mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 45,
    "code": "BT5",
    "name": "TB500(Thymosin B4 Acetate)",
    "spec": "5mg*10vials",
    "price": 90,
    "cost": 0
  },
  {
    "id": 46,
    "code": "BT10",
    "name": "TB500(Thymosin B4 Acetate)",
    "spec": "10mg*10vials",
    "price": 169,
    "cost": 0
  },
  {
    "id": 47,
    "code": "CND2",
    "name": "CJC 1295 (without DAC)",
    "spec": "2mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 48,
    "code": "CND5",
    "name": "CJC 1295 (without DAC)",
    "spec": "5mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 49,
    "code": "CND10",
    "name": "CJC 1295 (without DAC)",
    "spec": "10mg*10vials",
    "price": 119,
    "cost": 0
  },
  {
    "id": 50,
    "code": "CGL5",
    "name": "Cagrilintide",
    "spec": "5mg*10vials",
    "price": 113,
    "cost": 0
  },
  {
    "id": 51,
    "code": "CGL10",
    "name": "Cagrilintide",
    "spec": "10mg*10vials",
    "price": 219,
    "cost": 0
  },
  {
    "id": 52,
    "code": "CS10",
    "name": "cagrilintide 5mg+ Semaglutide5mg",
    "spec": "10mg*10vials",
    "price": 188,
    "cost": 0
  },
  {
    "id": 53,
    "code": "CD5",
    "name": "cagrilintide 5mg+ Semaglutide5mg(CJC)",
    "spec": "10mg*10vials",
    "price": 238,
    "cost": 0
  },
  {
    "id": 54,
    "code": "CP10",
    "name": "CJC1295(withoutDAC)5mg+IPA 5mg",
    "spec": "10mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 55,
    "code": "CU50",
    "name": "GHK-CU",
    "spec": "50mg*10vials",
    "price": 35,
    "cost": 0
  },
  {
    "id": 56,
    "code": "CU100",
    "name": "GHK-CU",
    "spec": "100mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 57,
    "code": "CD2",
    "name": "CJC 1295 with DAC",
    "spec": "2mg*10vials",
    "price": 121,
    "cost": 0
  },
  {
    "id": 58,
    "code": "CD5",
    "name": "CJC 1295 with DAC",
    "spec": "5mg*10vials",
    "price": 242,
    "cost": 0
  },
  {
    "id": 59,
    "code": "CBL60",
    "name": "CBL60    Cerebrolysin",
    "spec": "60mg*10vials",
    "price": 91,
    "cost": 0
  },
  {
    "id": 60,
    "code": "CTL20",
    "name": "Cartalax",
    "spec": "20mg*10vials",
    "price": 176,
    "cost": 0
  },
  {
    "id": 61,
    "code": "CA20",
    "name": "Cardiogen",
    "spec": "20mg*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 62,
    "code": "CPL2",
    "name": "Chloramphenicol Injection（氯霉素注射液）",
    "spec": "2mg*10vials",
    "price": 7,
    "cost": 0
  },
  {
    "id": 63,
    "code": "DS2",
    "name": "DSIP",
    "spec": "2mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 64,
    "code": "DS5",
    "name": "DSIP",
    "spec": "5mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 65,
    "code": "DS10",
    "name": "DSIP",
    "spec": "10mg*10vials",
    "price": 82,
    "cost": 0
  },
  {
    "id": 66,
    "code": "DS15",
    "name": "DSIP",
    "spec": "15mg*10vials",
    "price": 107,
    "cost": 0
  },
  {
    "id": 67,
    "code": "DR5",
    "name": "Dermorphin",
    "spec": "5mg*10vials",
    "price": 62,
    "cost": 0
  },
  {
    "id": 68,
    "code": "DIH10",
    "name": "Dihexa",
    "spec": "10mg*10vials",
    "price": 77,
    "cost": 0
  },
  {
    "id": 69,
    "code": "ET10",
    "name": "Epitalon",
    "spec": "10mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 70,
    "code": "ET50",
    "name": "Epitalon",
    "spec": "50mg*10vials",
    "price": 193,
    "cost": 0
  },
  {
    "id": 71,
    "code": "EPO",
    "name": "EPO",
    "spec": "5000IU*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 72,
    "code": "FM2",
    "name": "MGF",
    "spec": "2mg*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 73,
    "code": "FR5",
    "name": "HGH Fragment 176-191",
    "spec": "5mg *10 vials",
    "price": 105,
    "cost": 0
  },
  {
    "id": 74,
    "code": "FMP2",
    "name": "PEG MGF",
    "spec": "2mg*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 75,
    "code": "F410",
    "name": "FOXO4-DRI",
    "spec": "10mg*10vials",
    "price": 52,
    "cost": 0
  },
  {
    "id": 76,
    "code": "FTTP2",
    "name": "Adipotide/FTTP",
    "spec": "2mg*10vials",
    "price": 61,
    "cost": 0
  },
  {
    "id": 77,
    "code": "FTTP5",
    "name": "Adipotide/FTTP",
    "spec": "5mg *10 vials",
    "price": 83,
    "cost": 0
  },
  {
    "id": 78,
    "code": "FTTP10",
    "name": "Adipotide/FTTP",
    "spec": "10mg*10vials",
    "price": 226,
    "cost": 0
  },
  {
    "id": 79,
    "code": "G75",
    "name": "HMG",
    "spec": "75iu*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 80,
    "code": "GND2",
    "name": "Gonadorelin",
    "spec": "2mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 81,
    "code": "G25",
    "name": "GHRP-2 Acetate",
    "spec": "5mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 82,
    "code": "G210",
    "name": "GHRP-2 Acetate",
    "spec": "10mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 83,
    "code": "G65",
    "name": "GHRP-6 Acetate",
    "spec": "5mg*10vials",
    "price": 40,
    "cost": 0
  },
  {
    "id": 84,
    "code": "G610",
    "name": "GHRP-6 Acetate",
    "spec": "10mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 85,
    "code": "GTT600",
    "name": "Glutathione",
    "spec": "600mg*10vials",
    "price": 40,
    "cost": 0
  },
  {
    "id": 86,
    "code": "GTT1500",
    "name": "Glutathione",
    "spec": "1500mg*10vials",
    "price": 65,
    "cost": 0
  },
  {
    "id": 87,
    "code": "GON5",
    "name": "Gonadorelin",
    "spec": "5mg *10 vials",
    "price": 83,
    "cost": 0
  },
  {
    "id": 88,
    "code": "GON10",
    "name": "Gonadorelin",
    "spec": "10mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 89,
    "code": "H6",
    "name": "HGH 191AA (Somatropin）",
    "spec": "6iu*10vials",
    "price": 52,
    "cost": 0
  },
  {
    "id": 90,
    "code": "H8",
    "name": "HGH 191AA (Somatropin）",
    "spec": "8iu*10vials",
    "price": 61,
    "cost": 0
  },
  {
    "id": 91,
    "code": "H10",
    "name": "HGH 191AA (Somatropin）",
    "spec": "10iu*10vials",
    "price": 69,
    "cost": 0
  },
  {
    "id": 92,
    "code": "H12",
    "name": "HGH 191AA (Somatropin）",
    "spec": "12iu*10vials",
    "price": 74,
    "cost": 0
  },
  {
    "id": 93,
    "code": "H15",
    "name": "HGH 191AA (Somatropin）",
    "spec": "15iu*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 94,
    "code": "H24",
    "name": "HGH 191AA (Somatropin）",
    "spec": "24iu*10vials",
    "price": 162,
    "cost": 0
  },
  {
    "id": 95,
    "code": "H36",
    "name": "HGH 191AA (Somatropin）",
    "spec": "36iu*10vials",
    "price": 209,
    "cost": 0
  },
  {
    "id": 96,
    "code": "G1K",
    "name": "HCG",
    "spec": "1000iu*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 97,
    "code": "G2K",
    "name": "HCG",
    "spec": "2000iu*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 98,
    "code": "G5K",
    "name": "HCG",
    "spec": "5000iu*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 99,
    "code": "G10K",
    "name": "HCG",
    "spec": "10000iu*10vials",
    "price": 198,
    "cost": 0
  },
  {
    "id": 100,
    "code": "HX2",
    "name": "Hexarelin Acetate",
    "spec": "2mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 101,
    "code": "HX5",
    "name": "Hexarelin Acetate",
    "spec": "5mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 102,
    "code": "IP2",
    "name": "Ipamorelin",
    "spec": "2mg*10vials",
    "price": 36,
    "cost": 0
  },
  {
    "id": 103,
    "code": "IP5",
    "name": "Ipamorelin",
    "spec": "5mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 104,
    "code": "IP10",
    "name": "Ipamorelin",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 105,
    "code": "IG01",
    "name": "IGF-1LR3",
    "spec": "0.1mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 106,
    "code": "IG1",
    "name": "IGF-1LR3",
    "spec": "1mg*10vials",
    "price": 245,
    "cost": 0
  },
  {
    "id": 107,
    "code": "IGD",
    "name": "IGF-DES",
    "spec": "2mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 108,
    "code": "KS5",
    "name": "Kiss Peptin-10",
    "spec": "5mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 109,
    "code": "KS10",
    "name": "Kiss Peptin-10",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 110,
    "code": "KLOW80",
    "name": "KLOW80(BBKG80)",
    "spec": "80mg*10vials",
    "price": 264,
    "cost": 0
  },
  {
    "id": 111,
    "code": "KPV5",
    "name": "KPV",
    "spec": "5mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 112,
    "code": "KPV10",
    "name": "KPV",
    "spec": "10mg*10vials",
    "price": 60,
    "cost": 0
  },
  {
    "id": 113,
    "code": "LC216",
    "name": "Lipo-c",
    "spec": "10ml*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 114,
    "code": "LB",
    "name": "Lemon Bottle",
    "spec": "10ml*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 115,
    "code": "LC600",
    "name": "L-carnitine 600mg",
    "spec": "10ml*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 116,
    "code": "LC1200",
    "name": "L-carnitine 1200mg",
    "spec": "10ml*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 117,
    "code": "MT1",
    "name": "Melanotan I",
    "spec": "10mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 118,
    "code": "MT2",
    "name": "Melanotan I",
    "spec": "10mg*10vials",
    "price": 75,
    "cost": 0
  },
  {
    "id": 119,
    "code": "ML10",
    "name": "Melanotan II",
    "spec": "10mg*10vials",
    "price": 95,
    "cost": 0
  },
  {
    "id": 120,
    "code": "MDT5",
    "name": "Mazdutide",
    "spec": "5mg*10vials",
    "price": 143,
    "cost": 0
  },
  {
    "id": 121,
    "code": "MDT10",
    "name": "Mazdutide",
    "spec": "10mg*10vials",
    "price": 273,
    "cost": 0
  },
  {
    "id": 122,
    "code": "MS10",
    "name": "MOTS-c (Human)",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 123,
    "code": "MS15",
    "name": "MOTS-c (Human)",
    "spec": "15mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 124,
    "code": "MS20",
    "name": "MOTS-c (Human)",
    "spec": "20mg*10vials",
    "price": 135,
    "cost": 0
  },
  {
    "id": 125,
    "code": "MS40",
    "name": "MOTS-c (Human)",
    "spec": "40mg*10vials",
    "price": 270,
    "cost": 0
  },
  {
    "id": 126,
    "code": "MK75",
    "name": "MK677",
    "spec": "5mg10vials",
    "price": 28,
    "cost": 0
  },
  {
    "id": 127,
    "code": "MT10",
    "name": "melatonin",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 128,
    "code": "NJ100",
    "name": "NAD+",
    "spec": "100mg*10vials",
    "price": 40,
    "cost": 0
  },
  {
    "id": 129,
    "code": "NJ300",
    "name": "NAD+",
    "spec": "300mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 130,
    "code": "NJ500",
    "name": "NAD+",
    "spec": "500mg*10vials",
    "price": 65,
    "cost": 0
  },
  {
    "id": 131,
    "code": "NJ1000",
    "name": "NAD+",
    "spec": "1000mg*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 132,
    "code": "NP810",
    "name": "Snap-8",
    "spec": "10mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 133,
    "code": "OT2",
    "name": "Oxytocin Acetate",
    "spec": "2mg*10vials",
    "price": 33,
    "cost": 0
  },
  {
    "id": 134,
    "code": "OT5",
    "name": "Oxytocin Acetate",
    "spec": "5mg*10vials",
    "price": 47,
    "cost": 0
  },
  {
    "id": 135,
    "code": "OT10",
    "name": "Oxytocin Acetate",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 136,
    "code": "P41",
    "name": "PT-141",
    "spec": "10mg*10vials",
    "price": 66,
    "cost": 0
  },
  {
    "id": 137,
    "code": "PIN10",
    "name": "Pinealon",
    "spec": "10mg*10vials",
    "price": 61,
    "cost": 0
  },
  {
    "id": 138,
    "code": "PNC5",
    "name": "PNC-27",
    "spec": "5mg*10vials",
    "price": 132,
    "cost": 0
  },
  {
    "id": 139,
    "code": "PT10",
    "name": "PT-10",
    "spec": "10mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 140,
    "code": "PT20",
    "name": "PT-20",
    "spec": "20mg*10vials",
    "price": 113,
    "cost": 0
  },
  {
    "id": 141,
    "code": "SMO5",
    "name": "Sermorelin",
    "spec": "5mg*10vials",
    "price": 83,
    "cost": 0
  },
  {
    "id": 142,
    "code": "SMO10",
    "name": "Sermorelin",
    "spec": "10mg*10vials",
    "price": 209,
    "cost": 0
  },
  {
    "id": 143,
    "code": "SK5",
    "name": "Selank",
    "spec": "5mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 144,
    "code": "SK10",
    "name": "Selank",
    "spec": "10mg*10vials",
    "price": 50,
    "cost": 0
  },
  {
    "id": 145,
    "code": "SK11",
    "name": "Selank",
    "spec": "11mg*10vials",
    "price": 83,
    "cost": 0
  },
  {
    "id": 146,
    "code": "SUR5",
    "name": "Survodutide",
    "spec": "5mg*10vials",
    "price": 143,
    "cost": 0
  },
  {
    "id": 147,
    "code": "SUR10",
    "name": "Survodutide",
    "spec": "10mg*10vials",
    "price": 319,
    "cost": 0
  },
  {
    "id": 148,
    "code": "TA5",
    "name": "Thymosin alpha 1",
    "spec": "5mg*10vials",
    "price": 132,
    "cost": 0
  },
  {
    "id": 149,
    "code": "TA10",
    "name": "Thymosin alpha 1",
    "spec": "10mg*10vials",
    "price": 253,
    "cost": 0
  },
  {
    "id": 150,
    "code": "TSM2",
    "name": "Tesamorelin",
    "spec": "2mg*10vials",
    "price": 41,
    "cost": 0
  },
  {
    "id": 151,
    "code": "TSM5",
    "name": "Tesamorelin",
    "spec": "5mg*10vials",
    "price": 80,
    "cost": 0
  },
  {
    "id": 152,
    "code": "TSM10",
    "name": "Tesamorelin",
    "spec": "10mg*10vials",
    "price": 160,
    "cost": 0
  },
  {
    "id": 153,
    "code": "TSM20",
    "name": "Tesamorelin",
    "spec": "20mg*10vials",
    "price": 248,
    "cost": 0
  },
  {
    "id": 154,
    "code": "TY10",
    "name": "Thymalin",
    "spec": "10mg*10vials",
    "price": 88,
    "cost": 0
  },
  {
    "id": 155,
    "code": "XA5",
    "name": "Semax",
    "spec": "5mg*10vials",
    "price": 47,
    "cost": 0
  },
  {
    "id": 156,
    "code": "XA10",
    "name": "Semax",
    "spec": "10mg*10vials",
    "price": 61,
    "cost": 0
  },
  {
    "id": 157,
    "code": "RA10",
    "name": "ARA 290",
    "spec": "10mg*10vials",
    "price": 96,
    "cost": 0
  },
  {
    "id": 158,
    "code": "2AD",
    "name": "AOD9604",
    "spec": "2mg*10vials",
    "price": 55,
    "cost": 0
  },
  {
    "id": 159,
    "code": "5AD",
    "name": "AOD9604",
    "spec": "5mg*10vials",
    "price": 80,
    "cost": 0
  },
  {
    "id": 160,
    "code": "10AD",
    "name": "AOD9604",
    "spec": "10mg*10vials",
    "price": 154,
    "cost": 0
  },
  {
    "id": 161,
    "code": "5AM",
    "name": "5-amino-1mq",
    "spec": "5mg*10vials",
    "price": 28,
    "cost": 0
  },
  {
    "id": 162,
    "code": "10AM",
    "name": "5-amino-1mq",
    "spec": "10mg*10vials",
    "price": 47,
    "cost": 0
  },
  {
    "id": 163,
    "code": "50AM",
    "name": "5-amino-1mq",
    "spec": "50mg*10vials",
    "price": 127,
    "cost": 0
  },
  {
    "id": 164,
    "code": "375",
    "name": "LL37",
    "spec": "5mg*10vials",
    "price": 138,
    "cost": 0
  },
  {
    "id": 165,
    "code": "2S10",
    "name": "SS-31",
    "spec": "10mg*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 166,
    "code": "2S50",
    "name": "SS-31",
    "spec": "50mg*10vials",
    "price": 375,
    "cost": 0
  },
  {
    "id": 167,
    "code": "VIP5",
    "name": "VIP",
    "spec": "5mg*10vials",
    "price": 99,
    "cost": 0
  },
  {
    "id": 168,
    "code": "VP10",
    "name": "VIP",
    "spec": "10mg*10vials",
    "price": 198,
    "cost": 0
  },
  {
    "id": 169,
    "code": "Vesugen",
    "name": "Vesugen",
    "spec": "10mg*10vials",
    "price": 116,
    "cost": 0
  },
  {
    "id": 170,
    "code": "322",
    "name": "slupp-322",
    "spec": "5mg*10vials",
    "price": 121,
    "cost": 0
  },
  {
    "id": 171,
    "code": "BAC3",
    "name": "Benzyl Alcohol 0.9% 抑菌水",
    "spec": "3ml*10vials",
    "price": 10,
    "cost": 0
  },
  {
    "id": 172,
    "code": "BAC10",
    "name": "Benzyl Alcohol 0.9% 抑菌水",
    "spec": "10ml*10vials",
    "price": 12,
    "cost": 0
  },
  {
    "id": 173,
    "code": "WAC",
    "name": "BAC Water",
    "spec": "3ml*10vials",
    "price": 10,
    "cost": 0
  },
  {
    "id": 174,
    "code": "WAC",
    "name": "BAC Water",
    "spec": "10ml*10vials",
    "price": 12,
    "cost": 0
  },
  {
    "id": 175,
    "code": "AA3",
    "name": "Acetic Acid water 0.6% 醋酸水",
    "spec": "3ml*10vials",
    "price": 10,
    "cost": 0
  },
  {
    "id": 176,
    "code": "AA10",
    "name": "Acetic Acid water 0.6% 醋酸水",
    "spec": "10ml*10vials",
    "price": 12,
    "cost": 0
  }
];
let products = defaultProducts.map(product => ({ ...product }));
