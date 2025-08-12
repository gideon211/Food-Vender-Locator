package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.Service.VendorService;
import com.vendorandcustomer.API.model.Vendor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping

public class VendorController {
    private final VendorService service;

    public VendorController(VendorService service){
        this.service = service;
    }

    @PostMapping
    public Vendor addVendor(@RequestBody Vendor vendor){
        return service.addVendor(vendor);
    }

    @GetMapping
    public List<Vendor> getAllVendors(){
        return service.getAllVendors();
    }

    @PutMapping
    public Vendor updateVendor(@PathVariable Long id, @RequestBody Vendor vendor){
        return service.updateVendor(id,vendor);
    }

    @GetMapping
    public List<Vendor> getNearbyVendors(@RequestParam double lat,
                                         @RequestParam double lon,
                                         @RequestParam(defaultValue = "5") double radiusKm){
        return service.findNearbyVendors(lat, lon, radiusKm);
    }
}
