// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax  = 20491192805390485299153009773594534940189261866228447918068658471970481763042;
    uint256 constant alphay  = 9383485363053290200918347156157836566562967994039712273449902621266178545958;
    uint256 constant betax1  = 4252822878758300859123897981450591353533073413197771768651442665752259397132;
    uint256 constant betax2  = 6375614351688725206403948262868962793625744043794305715222011528459656738731;
    uint256 constant betay1  = 21847035105528745403288232691147584728191162732299865338377159692350059136679;
    uint256 constant betay2  = 10505242626370262277552901082094356697409835680220590971873171140371331206856;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 9756991228099265068623437475681078511230970936583660767440261046227941467940;
    uint256 constant deltax2 = 13764700043758139531083165643269839940930473789972985158914317861593368697625;
    uint256 constant deltay1 = 13001079678609422794106788363162116879380271275096030088488226231329334529055;
    uint256 constant deltay2 = 5258272318226316337028915013454552862165137737874973915446094937157677388919;

    
    uint256 constant IC0x = 16246888948938332915232971989367955225772305791602828863564781000107369704867;
    uint256 constant IC0y = 13450906699414300809789326479061909492853837323495543598049345270483204534668;
    
    uint256 constant IC1x = 1949244854035881867018875133257993872478083769493118090685659178276519955973;
    uint256 constant IC1y = 19997970003911833036417974497811117759457988660738557287441898762913065289173;
    
    uint256 constant IC2x = 3227361632059852613704731028571850639736817177183674346493627723620409442320;
    uint256 constant IC2y = 12624397568484596314460930040499300061941461159321467023670271712732006032667;
    
    uint256 constant IC3x = 16461240322896993835219915313691661716224433101948819244632842668555979027625;
    uint256 constant IC3y = 14668896803547653300770809785414342542933804327281091079404604257350862053404;
    
    uint256 constant IC4x = 5814285101443726991131985411769131812333996921538831937186679368241373007917;
    uint256 constant IC4y = 14914994314274235816463860326479331199666935645535336893823545094917001035017;
    
    uint256 constant IC5x = 17634901351099722854518629074124734359585657382729667427840233559551961579083;
    uint256 constant IC5y = 9476937897738273943765518064568520159197338378877613035332853764155151773271;
    
    uint256 constant IC6x = 717260833055865081854544698923440146445957172047629132715509527254612869744;
    uint256 constant IC6y = 1566107585348627931095688019008333326509233218330101015825330722273745366942;
    
    uint256 constant IC7x = 15665180392847064993327842294693617895489598240766987333643959330423588872416;
    uint256 constant IC7y = 20147251377426524089174960799858760915094299697973692152241831342679457916886;
    
    uint256 constant IC8x = 7618423687194270937476869325270963716135920582674553816638664730395712397805;
    uint256 constant IC8y = 15702999798818144836802978261272984395650183288214795502784239529662025047832;
    
    uint256 constant IC9x = 17179577590176687860287972245362679008110582439275700308845556948140778444985;
    uint256 constant IC9y = 5248549440254282110239241489890066324164556810243293201915779788368631126797;
    
    uint256 constant IC10x = 16220811424987748556891156701188769044084532507083590722699155446011886363614;
    uint256 constant IC10y = 15664577844186490544541626357527142152788092578050368913005697390687984499774;
    
    uint256 constant IC11x = 13918466792204833853896224327071813248028850428289625954274616712082236383608;
    uint256 constant IC11y = 9456818064439603298839329823943333788718809927259998553829304994364070884167;
    
    uint256 constant IC12x = 6850605554295484385800735597295572579440829993215542717405031284975993164797;
    uint256 constant IC12y = 2777541556288905832772668011793797083620384729220772322249411711817898592067;
    
    uint256 constant IC13x = 3118881024110288786255022052630404101231361563986976042021971473717706578994;
    uint256 constant IC13y = 14325356822399244104251083100273307679536810272180262754945625896889136338284;
    
    uint256 constant IC14x = 19573889581853625865970493082841633388226914979441311698312947396455648592952;
    uint256 constant IC14y = 19640732403660378249641194726827139402466142748982311110726702229503516742317;
    
    uint256 constant IC15x = 8373733794880347560850001041965075748338675964010564720014432079252332581506;
    uint256 constant IC15y = 8693024955488072607588667769992554064405695158455236715527658419944482166192;
    
    uint256 constant IC16x = 12183509552292401186966395639406436811174843326753789404849626821043434625;
    uint256 constant IC16y = 2445415932333435532650854475155295939041181963489955764577908112779818153140;
    
    uint256 constant IC17x = 12943016870589949070170527849064355363418440971485541158704789288149875122474;
    uint256 constant IC17y = 3747840727073507819143684652282674944283547242031869370484258501543287830249;
    
    uint256 constant IC18x = 16314292504369116410672241808877195935194938373796353253957262132514161548687;
    uint256 constant IC18y = 14091780495772307109467855259782499345617243550110482872755508838349084252398;
    
    uint256 constant IC19x = 13782524612894316900036201982219488903914369138028663513989836557574321204093;
    uint256 constant IC19y = 6831707757900830227152590441136276639097498757710201188852533471941614935865;
    
    uint256 constant IC20x = 15027470618779859486843392878773847134587564875335796616716558576439026928945;
    uint256 constant IC20y = 4826639093765020102115549156762394774930954655136413219637100379491708430457;
    
    uint256 constant IC21x = 15846046000631621516150990956206396816363433179525465930273149466924264378504;
    uint256 constant IC21y = 21058669800435403970072730069683758752448335714370177888794701298333228064274;
    
    uint256 constant IC22x = 6332904146670154330142252976407553477001229466703279599715920831654263995271;
    uint256 constant IC22y = 20538498157324447811969514152845794094318096330809320081662385837502819215505;
    
    uint256 constant IC23x = 13693466408682125902431932268552605508540096175311540847731060631191327397055;
    uint256 constant IC23y = 5454741202118252282211777844761459315870595154972449209018748537307618762533;
    
    uint256 constant IC24x = 712296739088712808109942490286403094858782103460546011244079004057757926545;
    uint256 constant IC24y = 12474296622232014459886561034128337366162106284978230323358051712224231442113;
    
    uint256 constant IC25x = 13910611576506328662496482250092020234239789076354423433877347099972574768246;
    uint256 constant IC25y = 19043387851294515563239937698213090639804411728554942634833902877873020044676;
    
    uint256 constant IC26x = 7574763784016676908064242668919597575270577107623714876360853701995758106010;
    uint256 constant IC26y = 770039670061175181516197764391693859367520431966853982120296328048595927526;
    
 
    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[26] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, r)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }
            
            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))
                
                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))
                
                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))
                
                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))
                
                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))
                
                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))
                
                g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))
                
                g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))
                
                g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))
                
                g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))
                
                g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))
                
                g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))
                
                g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))
                
                g1_mulAccC(_pVk, IC16x, IC16y, calldataload(add(pubSignals, 480)))
                
                g1_mulAccC(_pVk, IC17x, IC17y, calldataload(add(pubSignals, 512)))
                
                g1_mulAccC(_pVk, IC18x, IC18y, calldataload(add(pubSignals, 544)))
                
                g1_mulAccC(_pVk, IC19x, IC19y, calldataload(add(pubSignals, 576)))
                
                g1_mulAccC(_pVk, IC20x, IC20y, calldataload(add(pubSignals, 608)))
                
                g1_mulAccC(_pVk, IC21x, IC21y, calldataload(add(pubSignals, 640)))
                
                g1_mulAccC(_pVk, IC22x, IC22y, calldataload(add(pubSignals, 672)))
                
                g1_mulAccC(_pVk, IC23x, IC23y, calldataload(add(pubSignals, 704)))
                
                g1_mulAccC(_pVk, IC24x, IC24y, calldataload(add(pubSignals, 736)))
                
                g1_mulAccC(_pVk, IC25x, IC25y, calldataload(add(pubSignals, 768)))
                
                g1_mulAccC(_pVk, IC26x, IC26y, calldataload(add(pubSignals, 800)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            
            checkField(calldataload(add(_pubSignals, 128)))
            
            checkField(calldataload(add(_pubSignals, 160)))
            
            checkField(calldataload(add(_pubSignals, 192)))
            
            checkField(calldataload(add(_pubSignals, 224)))
            
            checkField(calldataload(add(_pubSignals, 256)))
            
            checkField(calldataload(add(_pubSignals, 288)))
            
            checkField(calldataload(add(_pubSignals, 320)))
            
            checkField(calldataload(add(_pubSignals, 352)))
            
            checkField(calldataload(add(_pubSignals, 384)))
            
            checkField(calldataload(add(_pubSignals, 416)))
            
            checkField(calldataload(add(_pubSignals, 448)))
            
            checkField(calldataload(add(_pubSignals, 480)))
            
            checkField(calldataload(add(_pubSignals, 512)))
            
            checkField(calldataload(add(_pubSignals, 544)))
            
            checkField(calldataload(add(_pubSignals, 576)))
            
            checkField(calldataload(add(_pubSignals, 608)))
            
            checkField(calldataload(add(_pubSignals, 640)))
            
            checkField(calldataload(add(_pubSignals, 672)))
            
            checkField(calldataload(add(_pubSignals, 704)))
            
            checkField(calldataload(add(_pubSignals, 736)))
            
            checkField(calldataload(add(_pubSignals, 768)))
            
            checkField(calldataload(add(_pubSignals, 800)))
            
            checkField(calldataload(add(_pubSignals, 832)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }
