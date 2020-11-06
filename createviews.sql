/*in the create view gui/dialog */
CREATE MATERIALIZED VIEW minnesota.gssurgo_soilsgrp AS
select minnesota.ssurgo_mupolygon.mukey as polygon_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey as table_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.hydrolgrp_dcd as hydrolgrp,
       minnesota.ssurgo_mupolygon.geom as geom,
       minnesota.ssurgo_mupolygon.id as id
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;


/* view for each index, needed to do views because if added the same layer multiple times the callback would be the same therefore removing or adding layers that aren't correct. At least I think it would */
CREATE MATERIALIZED VIEW minnesota.majorscores_bio_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.b_i_mean as b_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);


CREATE MATERIALIZED VIEW minnesota.majorscores_hyd_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.h_i_mean as h_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);
      
CREATE MATERIALIZED VIEW minnesota.majorscores_geo_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.g_i_mean as g_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);   
      
CREATE MATERIALIZED VIEW minnesota.majorscores_con_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.c_i_mean as c_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int); 
      
CREATE MATERIALIZED VIEW minnesota.majorscores_wq_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.w_i_mean as w_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int); 
      
CREATE MATERIALIZED VIEW minnesota.majorscores_comb_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.a_i_mean as a_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);      



/*Then need to alter the view to add unique index so can add layer to qgis */

CREATE UNIQUE INDEX ON minnesota.gssurgo_soilsgrp (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_bio_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_hyd_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_geo_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_con_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_wq_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_comb_index_mv (id);

Select * 
FROM minnesota."Altered_Watercourse" 
WHERE awevttype = 1 OR awevttype = 2 OR awevttype = 3 OR awevttype = 4

SELECT *
FROM minnesota.nwi_2009_to_2014
WHERE wetland_type = 'Freshwater Emergent Wetland' OR wetland_type = 'Freshwater Forested/Shrub Wetland'

SELECT *
FROM clflwd.nwi_clp_clflwd
WHERE wetland_ty = 'Freshwater Emergent Wetland' OR wetland_ty = 'Freshwater Forested/Shrub Wetland'

SELECT *
FROM minnesota.impaired_2020_draft_streams
WHERE NOT affected_u = 'AQC'

SELECT *
FROM minnesota.impaired_2020_draft_lakes
WHERE NOT affected_u = 'AQC'

CREATE MATERIALIZED VIEW minnesota.pwi_basins_mv
AS
SELECT *
FROM minnesota.pwi_basins
WHERE pwi_class = 'P'

CREATE MATERIALIZED VIEW minnesota.pwi_basins_wetlnd_mv
AS
SELECT *
FROM minnesota.pwi_basins
WHERE pwi_class = 'W'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'TOWNSHIP'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'CITY'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'CITY' AND (feature_na = 'Chisago City' OR feature_na = 'Chisago Lake' OR feature_na = 'Forest Lake' OR feature_na = 'Franconia' OR feature_na = 'Scandia' OR feature_na = 'Wyoming');



CREATE MATERIALIZED VIEW sev_2020.parcels_mv_sc1
AS
SELECT *
FROM sev_2020.parcels
WHERE sc_num = 1

CREATE MATERIALIZED VIEW sev_2020.studyarea_mv_sc1
AS
SELECT *
FROM sev_2020.study_areas
WHERE sc_num = 1

/* example for county bounds */
CREATE MATERIALIZED VIEW clflwd.cntybnds_clfl_mv
AS
select *
from minnesota.county_boundaries
WHERE minnesota.county_boundaries.county_nam = 'Anoka' OR minnesota.county_boundaries.county_nam = 'Washington' OR minnesota.county_boundaries.county_nam = 'Chisago'
WITH NO DATA;

ALTER TABLE clflwd.cntybnds_clfl_mv
    OWNER TO sgrandstrand;

/* HAVE to do this command after the views are made so you can add/see them 
Need to do this on joins too */
REFRESH MATERIALIZED VIEW clflwd.nwi_clp_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_hyd_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_geo_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_con_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_wq_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_comb_index_mv;
REFRESH MATERIALIZED VIEW minnesota.pwi_basins_mv;
REFRESH MATERIALIZED VIEW minnesota.pwi_basins_wetlnd_mv;

REFRESH MATERIALIZED VIEW minnesota.townships_mv;
/************************************************/
/********** NON WORKING CODE ********************/
/************************************************/

/*Need to alter the table of ID so it has not null constraint. Could cause issues otherwise. I think I should do this before creating unique index but it might not matter - THIS DOESN"T WORK. It doesn't sound like you should be changing materialized views to be not null... */
ALTER TABLE minnesota.majorscores_bio_index_mv
ALTER COLUMN id SET NOT NULL;

/*Created table but no geometry */
select minnesota.ssurgo_mupolygon.mukey as polygon_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey as table_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.hydrolgrp_dcd as hydrolgrp,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.id as table_id, 
       minnesota.ssurgo_mupolygon.id as polygon_id
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;

/*can't do it this way because both have id column */
select *
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;



/*example code from Mike */
create or replace view testing_list_view as 
select c.id as student_id,
       a.subject_id as subject_uid,
       c.full_name, 
       c.email_id,  
       c.created_at, 
       p.score, 
       s.application_status,
       a.verified,
       a.application_response
from students c
   inner join scores p
      on p.student_id=c.id
   inner join applications a
      on a.student_id = c.id and a.subject_id = p.subject_id
   inner join applicationstatus s 
      on s.id = a.status_id;
      
      /* demo */
CREATE MATERIALIZED VIEW minnesota.cntybnds_HenRam_mv
AS
select *
from minnesota.county_boundaries
WHERE minnesota.county_boundaries.county_nam = 'Hennepin' OR minnesota.county_boundaries.county_nam = 'Ramsey'


SELECT *
FROM minnesota.nwi_2009_to_2014
WHERE wetland_type = 'Freshwater Emergent Wetland' OR wetland_type = 'Freshwater Forested/Shrub Wetland'

CREATE MATERIALIZED VIEW cmscwd.mlccs_cmswd_pol_jur_mv AS

/* only gets you the geometry */
select ST_Intersection (r.geom, s.geom) as clipped
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."landcover_minnesota_land_cover_classification_system" as r
WHERE ST_Intersects(s.geom, r.geom)


CREATE MATERIALIZED VIEW cmscwd.mlccs_cmswd_pol_jur_mv AS
/*This seemed to work */
select r.id, r.geom, r.carto, s.geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."landcover_minnesota_land_cover_classification_system" as r
WHERE ST_Intersects (r.geom, s.geom);



select r.id, r.geom, r.carto, s.geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."landcover_minnesota_land_cover_classification_system" as r
WHERE ST_Intersects (r.geom, s.geom);

select r.id, r.geom, r.pin, s.geom as bound_geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."ParcelsWashington" as r
WHERE ST_Intersects (r.geom, s.geom);

select r.*, s.geom as bound_geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."ParcelsWashington" as r
WHERE ST_Intersects (r.geom, s.geom);


select r.id, r.geom, r.hydrolgrp, s.geom as bound_geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."gssurgo_soilsgrp" as r
WHERE ST_Intersects (r.geom, s.geom);

gssurgo_hydric_cmscwd_mv

select r.id, r.geom, r.hydrcratng_pp, s.geom as bound_geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."gssurgo_hydric_mv" as r
WHERE ST_Intersects (r.geom, s.geom);

select r.id, r.geom, r.circ39_class, s.geom as bound_geom
FROM cmscwd."CMWD_political_jurisdiction" as s, minnesota."nwi_2009_to_2014" as r
WHERE ST_Intersects (r.geom, s.geom);


REFRESH MATERIALIZED VIEW cmscwd.parcels_wash_co_all_mv;

select cmscwd.parcels_wash_co_mv.id, cmscwd.parcels_wash_co_mv.geom, cmscwd.parcels_wash_co_mv.county_pin, cmscwd.parcels_wash_co_mv.state_pin, cmscwd.parcels_wash_co_mv.anumberpre, 
cmscwd.parcels_wash_co_mv.anumber,
cmscwd.parcels_wash_co_mv.anumbersuf,
cmscwd.parcels_wash_co_mv.st_pre_mod,
cmscwd.parcels_wash_co_mv.st_pre_dir,
cmscwd.parcels_wash_co_mv.st_pre_typ,
cmscwd.parcels_wash_co_mv.st_pre_sep,
cmscwd.parcels_wash_co_mv.st_name,
cmscwd.parcels_wash_co_mv.st_pos_typ,
cmscwd.parcels_wash_co_mv.st_pos_dir,
cmscwd.parcels_wash_co_mv.st_pos_mod,
cmscwd.parcels_wash_co_mv.sub_type1,
cmscwd.parcels_wash_co_mv.sub_id1,
cmscwd.parcels_wash_co_mv.sub_type2,
cmscwd.parcels_wash_co_mv.sub_id2,
cmscwd.parcels_wash_co_mv.zip,
cmscwd.parcels_wash_co_mv.zip4,
cmscwd.parcels_wash_co_mv.ctu_name,
cmscwd.parcels_wash_co_mv.ctu_id_txt,
cmscwd.parcels_wash_co_mv.postcomm,
cmscwd.parcels_wash_co_mv.co_code,
cmscwd.parcels_wash_co_mv.co_name,
cmscwd.parcels_wash_co_mv.state_code,
cmscwd.parcels_wash_co_mv.lot,
cmscwd.parcels_wash_co_mv.block,
cmscwd.parcels_wash_co_mv.plat_name,
cmscwd.parcels_wash_co_mv.owner_name,
cmscwd.parcels_wash_co_mv.owner_more,
cmscwd.parcels_wash_co_mv.own_add_l1,
cmscwd.parcels_wash_co_mv.own_add_l2,
cmscwd.parcels_wash_co_mv.own_add_l3,
cmscwd.parcels_wash_co_mv.own_add_l4,
cmscwd.parcels_wash_co_mv.tax_name,
cmscwd.parcels_wash_co_mv.tax_add_l1,
cmscwd.parcels_wash_co_mv.tax_add_l2,
cmscwd.parcels_wash_co_mv.tax_add_l3,
cmscwd.parcels_wash_co_mv.tax_add_l4,
cmscwd.parcels_wash_co_mv.landmark,
cmscwd.parcels_wash_co_mv.homestead,
cmscwd.parcels_wash_co_mv.acres_poly,
cmscwd.parcels_wash_co_mv.acres_deed,
cmscwd.parcels_wash_co_mv.emv_land,
cmscwd.parcels_wash_co_mv.emv_bldg,
cmscwd.parcels_wash_co_mv.emv_total,
cmscwd.parcels_wash_co_mv.tax_year,
cmscwd.parcels_wash_co_mv.mkt_year,
cmscwd.parcels_wash_co_mv.tax_capac,
cmscwd.parcels_wash_co_mv.total_tax,
cmscwd.parcels_wash_co_mv.spec_asses,
cmscwd.parcels_wash_co_mv.useclass1,
cmscwd.parcels_wash_co_mv.useclass2,
cmscwd.parcels_wash_co_mv.useclass3,
cmscwd.parcels_wash_co_mv.useclass4,
cmscwd.parcels_wash_co_mv.multi_uses,
cmscwd.parcels_wash_co_mv.tax_exempt,
cmscwd.parcels_wash_co_mv.xuseclass1,
cmscwd.parcels_wash_co_mv.xuseclass2,
cmscwd.parcels_wash_co_mv.xuseclass3,
cmscwd.parcels_wash_co_mv.xuseclass4,
cmscwd.parcels_wash_co_mv.dwell_type,
cmscwd.parcels_wash_co_mv.home_style,
cmscwd.parcels_wash_co_mv.fin_sq_ft,
cmscwd.parcels_wash_co_mv.garage,
cmscwd.parcels_wash_co_mv.garagesqft,
cmscwd.parcels_wash_co_mv.basement,
cmscwd.parcels_wash_co_mv.heating,
cmscwd.parcels_wash_co_mv.cooling,
cmscwd.parcels_wash_co_mv.year_built,
cmscwd.parcels_wash_co_mv.num_units,
cmscwd.parcels_wash_co_mv.sale_date,
cmscwd.parcels_wash_co_mv.sale_value,
cmscwd.parcels_wash_co_mv.green_acre,
cmscwd.parcels_wash_co_mv.open_space,
cmscwd.parcels_wash_co_mv.ag_preserv,
cmscwd.parcels_wash_co_mv.agpre_enrd,
cmscwd.parcels_wash_co_mv.agpre_expd,
cmscwd.parcels_wash_co_mv.abb_legal,
cmscwd.parcels_wash_co_mv.edit_date,
cmscwd.parcels_wash_co_mv.exp_date,
cmscwd.parcels_wash_co_mv.polyptrel,
cmscwd.parcels_wash_co_mv.n_standard,
cmscwd.parcels_wash_co_mv.ownership,
cmscwd.parcels_wash_co_mv.school_dst,
cmscwd.parcels_wash_co_mv.wshd_dst,
cmscwd.parcels_wash_co_mv.section,
cmscwd.parcels_wash_co_mv.township,
cmscwd.parcels_wash_co_mv.range,
cmscwd.parcels_wash_co_mv.range_dir,
cmscwd.parcels_wash_co_mv.prin_mer,
cmscwd.parcels_wash_co_mv.pin,
cmscwd.parcels_wash_co_mv.viewid,
cmscwd.parcels_wash_co_mv.shape_leng,
cmscwd.parcels_wash_co_mv.shape_area
FROM cmscwd.parcels_wash_co_mv


/* Join mnram for MWMO and CMWD, Wetland Management Category  */

SELECT cmscwd.cmwd_mnram_11oct06.id as cmwd_id, cmscwd."MWMO_wetland_data_20Jan09".id as mwmo_id, cmscwd.cmwd_mnram_11oct06.mgmt_class, cmscwd."MWMO_wetland_data_20Jan09".mgmt_class, cmscwd."MWMO_wetland_data_20Jan09".geom, cmscwd.cmwd_mnram_11oct06.geom
FROM cmscwd.cmwd_mnram_11oct06, cmscwd."MWMO_wetland_data_20Jan09"


REFRESH MATERIALIZED VIEW cmscwd.wetland_mgmt_class_mv;