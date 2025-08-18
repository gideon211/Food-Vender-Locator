package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.Service.VendorService;
import com.vendorandcustomer.API.model.Vendor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
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

    @PutMapping("/update/{email}")
    public Vendor updateVendor(@PathVariable String email, @RequestBody Vendor vendor){
        return service.updateVendor(email,vendor);
    }

    @DeleteMapping("/{email}")
    public void deleteVendor(@PathVariable String email){
        service.deleteEmail(email);
    }


    @GetMapping("/vendors/nearby")
    public List<Vendor> getNearbyVendors(@RequestParam double lat,
                                         @RequestParam double lon,
                                         @RequestParam(defaultValue = "5") double radiusKm){
        return service.findNearbyVendors(lat, lon, radiusKm);
    }
}
