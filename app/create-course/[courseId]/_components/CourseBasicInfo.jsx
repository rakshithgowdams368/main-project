import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseBasicInfo({course, refreshData, edit=true}) {
    const [selectedFile, setSelectedFile] = useState();
    const [uploading, setUploading] = useState(false);
    
    // Hardcoded Cloudinary configuration
    const CLOUDINARY_CLOUD_NAME = 'dctskqld7';
    const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset'; // Try using the default preset
    
    useEffect(() => {
        if(course) {
            setSelectedFile(course?.courseBanner);
        }
    }, [course]);
    
    /**
     * Select file and Upload to Cloudinary
     * @param {*} event 
     */
    const onFileSelected = async(event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;
            
            // Show file preview immediately
            setSelectedFile(URL.createObjectURL(file));
            setUploading(true);
            
            // Create a FormData instance to send the file
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            
            console.log('Uploading to Cloudinary with cloud name:', CLOUDINARY_CLOUD_NAME);
            
            // Upload to Cloudinary
            const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
            console.log('Upload URL:', uploadUrl);
            
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${errorData.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Cloudinary response:', data);
            
            if (data.secure_url) {
                console.log('Upload Complete:', data.secure_url);
                
                // Update the URL in the database
                await db.update(CourseList)
                    .set({
                        courseBanner: data.secure_url
                    })
                    .where(eq(CourseList.id, course?.id));
                
                // Update the displayed image with the Cloudinary URL
                setSelectedFile(data.secure_url);
                
                // Refresh data if needed
                if (refreshData) {
                    refreshData(true);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(`Failed to upload image: ${error.message}`);
        } finally {
            setUploading(false);
        }
    }
    
    return (
        <div className='p-10 border rounded-xl shadow-sm mt-5 relative'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name}
                    {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />} </h2>
                    <p className='text-sm text-gray-400 mt-3 '>{course?.courseOutput?.course?.description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlineRectangleStack />{course?.category}</h2>
                    
                    {!edit && <Link href={'/course/' + course?.courseId + "/start"}>
                        <Button className="w-full mt-5">Start</Button>
                    </Link>}
                </div>
                <div>
                    <label htmlFor='upload-image'>
                        <div className="relative">
                            <Image 
                                src={selectedFile ? selectedFile : '/placeholder.png'} 
                                width={300} 
                                height={300}
                                className='w-full rounded-xl h-[250px] object-cover cursor-pointer'
                                alt="Course banner"
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                                    <div className="text-white">Uploading...</div>
                                </div>
                            )}
                        </div>
                    </label>
                    {edit && <input 
                        type="file" 
                        id="upload-image"
                        accept="image/*"
                        className='opacity-0' 
                        onChange={onFileSelected} 
                    />}
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo