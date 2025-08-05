package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.Service.VendorService;
import com.vendorandcustomer.API.model.Vendor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")

public class VendorController {
    private final VendorService service;

    public VendorController(VendorService service)
    {this.service = service;}

    @PostMapping("/add")
    public Vendor addVendor(@RequestBody Vendor vendor){
        return service.addVendor(vendor);
    }

    @GetMapping("/vendors")
    public List<Vendor> getAllVendors(){
        return service.getAllVendors();
    }

    @PutMapping("/update")
    public Vendor updateVendor(@PathVariable Long id, @RequestBody Vendor vendor){
        return service.updateVendor(id,vendor);
    }

    @GetMapping("/vendors/nearby")
    public List<Vendor> getNearbyVendors(@RequestParam double lat,
                                         @RequestParam double lon,
                                         @RequestParam(defaultValue = "5") double radiusKm){
        return service.findNearbyVendors(lat, lon, radiusKm);
    }
}
