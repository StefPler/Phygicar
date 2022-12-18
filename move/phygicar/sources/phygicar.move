module phygicar::phygicar {
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use std::string::{Self, String};
    use sui::url::{Self, Url};
    use sui::dynamic_field as dfield;
    use sui::transfer;

    const EWrongKmInput: u64 = 0;
    const EWrongUnlockableInput: u64 = 1;

    struct CarNft has key, store {
        id: UID,
        make: String,
        model: String,
        year: u16,
        sn: String,
        engine_location: String,
        drive_wheel: String,
        km: u64,
        color: String,
        unlockable: bool,
        url: Url,         
    }

    struct ServiceLog has key, store {
        id: UID,
        date: String,
        mechanic: String,
        filter_change: String,
        oil_change: String,
    }

//  ========== Functions ==========

    public entry fun register(
        make: vector<u8>,
        model: vector<u8>,
        year: u16,
        sn: vector<u8>,
        engine_location: vector<u8>,
        drive_wheel: vector<u8>,
        url: vector<u8>,
        km: u64,
        color: vector<u8>,
        unlockable: bool,
        ctx: &mut TxContext
    ) {
        let carnft = CarNft {
            id: object::new(ctx),
            make: string::utf8(make),
            model: string::utf8(model),
            year,
            sn: string::utf8(sn),
            engine_location: string::utf8(engine_location),
            drive_wheel: string::utf8(drive_wheel),
            km,
            color: string::utf8(color),
            unlockable,
            url: url::new_unsafe_from_bytes(url),
        };
        transfer::transfer(carnft, tx_context::sender(ctx))
    }

    public entry fun add_service_log(
        car: &mut CarNft, 
        date: vector<u8>,
        mechanic: vector<u8>,
        filter_change: vector<u8>,
        oil_change: vector<u8>,
        ctx: &mut TxContext,
        ) {
        let service_log = ServiceLog {
            id: object::new(ctx),
            date: string::utf8(date),
            mechanic: string::utf8(mechanic),
            filter_change: string::utf8(filter_change),
            oil_change: string::utf8(oil_change)
        };
        dfield::add(&mut car.id, object::id(&service_log), service_log)
    }

    public entry fun mutate_km(car: &mut CarNft, km: u64, _ctx: &mut TxContext) {
        assert!(car.km <= km, EWrongKmInput);
        car.km = km
    }
    
    public entry fun mutate_color(car: &mut CarNft, color: vector<u8>, _ctx: &mut TxContext) {
        car.color = string::utf8(color)
    }

    public entry fun set_unlockable(car: &mut CarNft, unlockable: bool, _ctx: &mut TxContext) {
        assert!(car.unlockable != unlockable, EWrongUnlockableInput);
        car.unlockable = unlockable
    }
}